const { asyncHandler } = require("../middleware/error.middleware");
const { ApiResponse, ApiError } = require("../utils/apiResponse");
const User = require("../models/User.model");
const Application = require("../models/Application.model");
const Internship = require("../models/Internship.model");

// ─── @desc    Get user profile
// ─── @route   GET /api/v1/users/profile
// ─── @access  Private
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("savedInternships", "title company type stipend applicationDeadline");
  return res.status(200).json(new ApiResponse(200, user, "Profile fetched"));
});

// ─── @desc    Update user profile
// ─── @route   PUT /api/v1/users/profile
// ─── @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const allowedFields = ["name", "profile"];
  const updates = {};
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  });

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json(new ApiResponse(200, user, "Profile updated"));
});

// ─── @desc    Upload / update avatar
// ─── @route   PUT /api/v1/users/avatar
// ─── @access  Private
const updateAvatar = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, "No file uploaded");

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatar: { url: req.file.path, publicId: req.file.filename } },
    { new: true }
  );

  return res.status(200).json(new ApiResponse(200, user, "Avatar updated"));
});

// ─── @desc    Upload resume (students only)
// ─── @route   PUT /api/v1/users/resume
// ─── @access  Private (Student)
const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, "No file uploaded");

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { "profile.resume": { url: req.file.path, publicId: req.file.filename } },
    { new: true }
  );

  return res.status(200).json(new ApiResponse(200, user, "Resume uploaded"));
});

// ─── @desc    Get student dashboard stats
// ─── @route   GET /api/v1/users/dashboard/student
// ─── @access  Private (Student)
const getStudentDashboard = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Aggregate application counts by status in a single DB query
  const statusCounts = await Application.aggregate([
    { $match: { applicant: userId } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const counts = { total: 0, pending: 0, shortlisted: 0, accepted: 0, rejected: 0, reviewed: 0 };
  statusCounts.forEach(({ _id, count }) => {
    counts[_id] = count;
    counts.total += count;
  });

  // Recent 4 applications with internship + company details
  const recentApplications = await Application.find({ applicant: userId })
    .sort("-createdAt")
    .limit(4)
    .populate({
      path: "internship",
      select: "title type stipend location",
      populate: { path: "company", select: "name logo" },
    });

  // Monthly aggregation for the trend chart (last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const trendRaw = await Application.aggregate([
    { $match: { applicant: userId, createdAt: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          status: "$status",
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  // Build 6-month chart array
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const trend = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const y = d.getFullYear();
    const m = d.getMonth() + 1; // 1-indexed
    const applied = trendRaw.filter(r => r._id.year === y && r._id.month === m).reduce((s, r) => s + r.count, 0);
    const shortlisted = trendRaw.filter(r => r._id.year === y && r._id.month === m && r._id.status === "shortlisted").reduce((s, r) => s + r.count, 0);
    trend.push({ month: MONTHS[m - 1], applied, shortlisted });
  }

  // Profile completion score (0–100)
  const user = await User.findById(userId);
  let score = 0;
  if (user.name) score += 20;
  if (user.profile?.bio) score += 15;
  if (user.profile?.skills?.length > 0) score += 20;
  if (user.profile?.education?.length > 0) score += 20;
  if (user.profile?.resume?.url) score += 15;
  if (user.profile?.socialLinks?.github || user.profile?.socialLinks?.linkedin) score += 10;
  const profileScore = Math.min(100, score);

  // Saved internships count
  const savedCount = user.savedInternships?.length || 0;

  return res.status(200).json(
    new ApiResponse(200, { counts, recentApplications, trend, profileScore, savedCount }, "Dashboard data fetched")
  );
});

// ─── @desc    Get recruiter dashboard stats
// ─── @route   GET /api/v1/users/dashboard/recruiter
// ─── @access  Private (Recruiter)
const getRecruiterDashboard = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Get recruiter's listings
  const myInternships = await Internship.find({ postedBy: userId }).select("_id isActive");
  const internshipIds = myInternships.map(i => i._id);
  const activeListings = myInternships.filter(i => i.isActive).length;
  const totalListings = myInternships.length;

  // Aggregate applications for those listings
  const applicationsRaw = await Application.find({ internship: { $in: internshipIds } })
    .select("status createdAt");

  let totalApplications = 0;
  let shortlisted = 0;
  let hired = 0; // Assuming accepted = hired

  applicationsRaw.forEach(app => {
    totalApplications++;
    if (app.status === "shortlisted") shortlisted++;
    if (app.status === "accepted") hired++;
  });

  // Recent applications (last 5)
  const recentApplications = await Application.find({ internship: { $in: internshipIds } })
    .sort("-createdAt")
    .limit(5)
    .populate("applicant", "name email avatar")
    .populate("internship", "title");

  return res.status(200).json(
    new ApiResponse(200, {
      totalListings,
      activeListings,
      totalApplications,
      shortlisted,
      hired,
      recentApplications
    }, "Dashboard data fetched")
  );
});

// ─── @desc    Toggle save/unsave an internship
// ─── @route   PATCH /api/v1/users/saved/:internshipId
// ─── @access  Private (Student)
const toggleSavedInternship = asyncHandler(async (req, res) => {
  const { internshipId } = req.params;

  const user = await User.findById(req.user._id);
  const isSaved = user.savedInternships.some((id) => id.toString() === internshipId);

  if (isSaved) {
    user.savedInternships = user.savedInternships.filter((id) => id.toString() !== internshipId);
  } else {
    user.savedInternships.push(internshipId);
  }

  await user.save({ validateBeforeSave: false });

  return res.status(200).json(
    new ApiResponse(200, { saved: !isSaved, savedInternships: user.savedInternships }, isSaved ? "Internship unsaved" : "Internship saved")
  );
});

// ─── @desc    Get saved internships for a student
// ─── @route   GET /api/v1/users/saved
// ─── @access  Private (Student)
const getSavedInternships = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "savedInternships",
    populate: { path: "company", select: "name logo" },
  });

  return res.status(200).json(new ApiResponse(200, user.savedInternships || [], "Saved internships fetched"));
});

// ─── @desc    Get all users (admin)
// ─── @route   GET /api/v1/users
// ─── @access  Private (Admin)
const getAllUsers = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
    User.countDocuments(),
  ]);

  return res.status(200).json(
    new ApiResponse(200, { users, total, page, pages: Math.ceil(total / limit) }, "Users fetched")
  );
});

// ─── @desc    Toggle user active status (admin)
// ─── @route   PATCH /api/v1/users/:id/toggle-status
// ─── @access  Private (Admin)
const toggleUserStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, "User not found");

  user.isActive = !user.isActive;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json(
    new ApiResponse(200, { isActive: user.isActive }, `User ${user.isActive ? "activated" : "deactivated"}`)
  );
});

module.exports = {
  getProfile,
  updateProfile,
  updateAvatar,
  uploadResume,
  getStudentDashboard,
  getRecruiterDashboard,
  toggleSavedInternship,
  getSavedInternships,
  getAllUsers,
  toggleUserStatus,
};
