const { asyncHandler } = require("../middleware/error.middleware");
const { ApiResponse, ApiError } = require("../utils/apiResponse");
const Internship = require("../models/Internship.model");
const Company = require("../models/Company.model");
const { PAGINATION } = require("../config/constants");

// ─── @desc    Get all internships (with filters, search, pagination)
// ─── @route   GET /api/v1/internships
// ─── @access  Public
const getAllInternships = asyncHandler(async (req, res) => {
  const {
    search,
    type,
    category,
    skills,
    minStipend,
    maxStipend,
    page = PAGINATION.DEFAULT_PAGE,
    limit = PAGINATION.DEFAULT_LIMIT,
    sort = "-createdAt",
  } = req.query;

  const query = { isActive: true, applicationDeadline: { $gte: new Date() } };

  if (search) query.$text = { $search: search };
  if (type) query.type = type;
  if (category) query.category = category;
  if (skills) query.skillsRequired = { $in: skills.split(",").map((s) => s.trim()) };
  if (minStipend) query["stipend.amount"] = { $gte: Number(minStipend) };
  if (maxStipend) query["stipend.amount"] = { ...query["stipend.amount"], $lte: Number(maxStipend) };

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(Number(limit), PAGINATION.MAX_LIMIT);
  const skip = (pageNum - 1) * limitNum;

  const [internships, total] = await Promise.all([
    Internship.find(query)
      .populate("company", "name logo industry")
      .populate("postedBy", "name avatar")
      .sort(sort)
      .skip(skip)
      .limit(limitNum),
    Internship.countDocuments(query),
  ]);

  return res.status(200).json(
    new ApiResponse(200, { internships, total, page: pageNum, pages: Math.ceil(total / limitNum) }, "Internships fetched")
  );
});

// ─── @desc    Get single internship by ID
// ─── @route   GET /api/v1/internships/:id
// ─── @access  Public
const getInternshipById = asyncHandler(async (req, res) => {
  const internship = await Internship.findByIdAndUpdate(
    req.params.id,
    { $inc: { viewCount: 1 } },
    { new: true }
  )
    .populate("company")
    .populate("postedBy", "name avatar email");

  if (!internship) throw new ApiError(404, "Internship not found");
  return res.status(200).json(new ApiResponse(200, internship, "Internship fetched"));
});

// ─── @desc    Create internship
// ─── @route   POST /api/v1/internships
// ─── @access  Private (Recruiter | Admin)
const createInternship = asyncHandler(async (req, res) => {
  const company = await Company.findOne({ recruiter: req.user._id });
  if (!company) throw new ApiError(400, "You must create a company profile before posting internships.");

  const internship = await Internship.create({
    ...req.body,
    company: company._id,
    postedBy: req.user._id,
  });

  return res.status(201).json(new ApiResponse(201, internship, "Internship created successfully"));
});

// ─── @desc    Update internship
// ─── @route   PUT /api/v1/internships/:id
// ─── @access  Private (Recruiter | Admin)
const updateInternship = asyncHandler(async (req, res) => {
  const internship = await Internship.findOne({ _id: req.params.id, postedBy: req.user._id });
  if (!internship) throw new ApiError(404, "Internship not found or not authorised");

  const updated = await Internship.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  return res.status(200).json(new ApiResponse(200, updated, "Internship updated"));
});

// ─── @desc    Delete internship
// ─── @route   DELETE /api/v1/internships/:id
// ─── @access  Private (Recruiter | Admin)
const deleteInternship = asyncHandler(async (req, res) => {
  const internship = await Internship.findOne({ _id: req.params.id, postedBy: req.user._id });
  if (!internship) throw new ApiError(404, "Internship not found or not authorised");

  await internship.deleteOne();
  return res.status(200).json(new ApiResponse(200, null, "Internship deleted"));
});

// ─── @desc    Get recruiter's own internship listings
// ─── @route   GET /api/v1/internships/my-listings
// ─── @access  Private (Recruiter)
const getMyListings = asyncHandler(async (req, res) => {
  const internships = await Internship.find({ postedBy: req.user._id }).populate("company", "name logo").sort("-createdAt");
  return res.status(200).json(new ApiResponse(200, internships, "Your listings fetched"));
});

module.exports = { getAllInternships, getInternshipById, createInternship, updateInternship, deleteInternship, getMyListings };
