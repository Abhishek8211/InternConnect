const { asyncHandler } = require("../middleware/error.middleware");
const { ApiResponse, ApiError } = require("../utils/apiResponse");
const Application = require("../models/Application.model");
const Internship = require("../models/Internship.model");
const { ROLES, APPLICATION_STATUS } = require("../config/constants");

// ─── @desc    Apply to an internship
// ─── @route   POST /api/v1/applications
// ─── @access  Private (Student)
const applyToInternship = asyncHandler(async (req, res) => {
  const { internshipId, coverLetter } = req.body;

  const internship = await Internship.findById(internshipId);
  if (!internship || !internship.isActive) throw new ApiError(404, "Internship not found or closed");
  if (internship.applicationDeadline < new Date()) throw new ApiError(400, "Application deadline has passed");

  const existingApplication = await Application.findOne({ internship: internshipId, applicant: req.user._id });
  if (existingApplication) throw new ApiError(409, "You have already applied to this internship");

  if (!req.file && !req.user.profile?.resume?.url) {
    throw new ApiError(400, "Please upload a resume or have one in your profile");
  }

  const resumeUrl = req.file ? req.file.path : req.user.profile.resume.url;
  const resumePublicId = req.file ? req.file.filename : req.user.profile.resume.publicId;

  const application = await Application.create({
    internship: internshipId,
    applicant: req.user._id,
    coverLetter,
    resume: { url: resumeUrl, publicId: resumePublicId },
  });

  return res.status(201).json(new ApiResponse(201, application, "Application submitted successfully"));
});

// ─── @desc    Get current student's applications
// ─── @route   GET /api/v1/applications/my
// ─── @access  Private (Student)
const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ applicant: req.user._id })
    .populate({ path: "internship", populate: { path: "company", select: "name logo" } })
    .sort("-createdAt");
  return res.status(200).json(new ApiResponse(200, applications, "Your applications fetched"));
});

// ─── @desc    Get all applications for a specific internship (recruiter)
// ─── @route   GET /api/v1/applications/internship/:internshipId
// ─── @access  Private (Recruiter | Admin)
const getApplicationsByInternship = asyncHandler(async (req, res) => {
  const { internshipId } = req.params;

  // Verify ownership if recruiter
  if (req.user.role === ROLES.RECRUITER) {
    const internship = await Internship.findOne({ _id: internshipId, postedBy: req.user._id });
    if (!internship) throw new ApiError(403, "Not authorised to view these applications");
  }

  const applications = await Application.find({ internship: internshipId })
    .populate("applicant", "name email avatar profile.skills profile.education")
    .sort("-createdAt");

  return res.status(200).json(new ApiResponse(200, applications, "Applications fetched"));
});

// ─── @desc    Update application status
// ─── @route   PATCH /api/v1/applications/:id/status
// ─── @access  Private (Recruiter | Admin)
const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status, recruiterNote } = req.body;
  if (!Object.values(APPLICATION_STATUS).includes(status)) {
    throw new ApiError(400, `Invalid status. Valid values: ${Object.values(APPLICATION_STATUS).join(", ")}`);
  }

  const application = await Application.findById(req.params.id).populate("internship");
  if (!application) throw new ApiError(404, "Application not found");

  if (req.user.role === ROLES.RECRUITER && application.internship.postedBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorised");
  }

  application.status = status;
  if (recruiterNote) application.recruiterNote = recruiterNote;
  if (status === APPLICATION_STATUS.REVIEWED) application.reviewedAt = new Date();
  if ([APPLICATION_STATUS.ACCEPTED, APPLICATION_STATUS.REJECTED].includes(status)) application.decisionAt = new Date();

  await application.save();
  return res.status(200).json(new ApiResponse(200, application, "Application status updated"));
});

// ─── @desc    Withdraw application
// ─── @route   DELETE /api/v1/applications/:id
// ─── @access  Private (Student)
const withdrawApplication = asyncHandler(async (req, res) => {
  const application = await Application.findOne({ _id: req.params.id, applicant: req.user._id });
  if (!application) throw new ApiError(404, "Application not found");
  if (application.status !== APPLICATION_STATUS.PENDING) {
    throw new ApiError(400, "Cannot withdraw an application that has already been reviewed");
  }

  await application.deleteOne();
  return res.status(200).json(new ApiResponse(200, null, "Application withdrawn"));
});

module.exports = { applyToInternship, getMyApplications, getApplicationsByInternship, updateApplicationStatus, withdrawApplication };
