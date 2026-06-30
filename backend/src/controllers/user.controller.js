const { asyncHandler } = require("../middleware/error.middleware");
const { ApiResponse, ApiError } = require("../utils/apiResponse");
const User = require("../models/User.model");

// ─── @desc    Get user profile
// ─── @route   GET /api/v1/users/profile
// ─── @access  Private
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
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

module.exports = { getProfile, updateProfile, updateAvatar, uploadResume, getAllUsers, toggleUserStatus };
