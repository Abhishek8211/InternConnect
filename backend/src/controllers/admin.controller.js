const { asyncHandler } = require("../middleware/error.middleware");
const { ApiResponse } = require("../utils/apiResponse");
const User = require("../models/User.model");
const Internship = require("../models/Internship.model");
const Application = require("../models/Application.model");
const Company = require("../models/Company.model");

// ─── @desc    Get platform-wide stats
// ─── @route   GET /api/v1/admin/stats
// ─── @access  Private (Admin)
const getDashboardStats = asyncHandler(async (_req, res) => {
  const [totalUsers, totalInternships, totalApplications, totalCompanies] =
    await Promise.all([
      User.countDocuments(),
      Internship.countDocuments(),
      Application.countDocuments(),
      Company.countDocuments(),
    ]);

  const usersByRole = await User.aggregate([
    { $group: { _id: "$role", count: { $sum: 1 } } },
  ]);

  const recentUsers = await User.find()
    .sort("-createdAt")
    .limit(5)
    .select("name email role createdAt avatar");

  return res.status(200).json(
    new ApiResponse(
      200,
      { totalUsers, totalInternships, totalApplications, totalCompanies, usersByRole, recentUsers },
      "Dashboard stats fetched"
    )
  );
});

// ─── @desc    Toggle internship featured status
// ─── @route   PATCH /api/v1/admin/internships/:id/feature
// ─── @access  Private (Admin)
const toggleFeatureInternship = asyncHandler(async (req, res) => {
  const internship = await Internship.findById(req.params.id);
  if (!internship) throw new Error("Internship not found");

  internship.isFeatured = !internship.isFeatured;
  await internship.save();

  return res.status(200).json(
    new ApiResponse(200, { isFeatured: internship.isFeatured }, `Internship ${internship.isFeatured ? "featured" : "unfeatured"}`)
  );
});

// ─── @desc    Verify a company
// ─── @route   PATCH /api/v1/admin/companies/:id/verify
// ─── @access  Private (Admin)
const verifyCompany = asyncHandler(async (req, res) => {
  const company = await Company.findByIdAndUpdate(
    req.params.id,
    { isVerified: true },
    { new: true }
  );
  return res.status(200).json(new ApiResponse(200, company, "Company verified"));
});

module.exports = { getDashboardStats, toggleFeatureInternship, verifyCompany };
