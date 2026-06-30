const { asyncHandler } = require("../middleware/error.middleware");
const { ApiResponse, ApiError } = require("../utils/apiResponse");
const User = require("../models/User.model");
const generateToken = require("../utils/generateToken");
const { COOKIE_OPTIONS } = require("../config/constants");
const { sendEmail, welcomeEmailHtml } = require("../utils/email");

// ─── @desc    Register a new user
// ─── @route   POST /api/v1/auth/register
// ─── @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(409, "Email already registered.");

  const user = await User.create({ name, email, password, role });
  const token = generateToken(user._id, user.role);

  // Send welcome email (non-blocking)
  sendEmail({ to: user.email, subject: "Welcome to InternConnect 🚀", html: welcomeEmailHtml(user.name) }).catch(console.error);

  res.cookie("token", token, COOKIE_OPTIONS);
  return res.status(201).json(
    new ApiResponse(201, { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token }, "Registration successful")
  );
});

// ─── @desc    Login user
// ─── @route   POST /api/v1/auth/login
// ─── @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(401, "Invalid email or password.");
  }

  if (!user.isActive) throw new ApiError(403, "Your account has been deactivated. Contact support.");

  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  const token = generateToken(user._id, user.role);
  res.cookie("token", token, COOKIE_OPTIONS);

  return res.status(200).json(
    new ApiResponse(200, { user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar }, token }, "Login successful")
  );
});

// ─── @desc    Logout user
// ─── @route   POST /api/v1/auth/logout
// ─── @access  Private
const logout = asyncHandler(async (_req, res) => {
  res.cookie("token", "", { ...COOKIE_OPTIONS, maxAge: 0 });
  return res.status(200).json(new ApiResponse(200, null, "Logged out successfully"));
});

// ─── @desc    Get currently logged-in user
// ─── @route   GET /api/v1/auth/me
// ─── @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  return res.status(200).json(new ApiResponse(200, user, "Current user fetched"));
});

module.exports = { register, login, logout, getMe };
