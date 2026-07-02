const express = require("express");
const {
  getProfile,
  updateProfile,
  updateAvatar,
  uploadResume,
  getStudentDashboard,
  toggleSavedInternship,
  getSavedInternships,
  getAllUsers,
  toggleUserStatus,
} = require("../controllers/user.controller");
const { protect, authorise } = require("../middleware/auth.middleware");
const { uploadImage, uploadResume: uploadResumeMw } = require("../middleware/upload.middleware");

const router = express.Router();

// All user routes require authentication
router.use(protect);

// Profile
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.put("/avatar", uploadImage.single("avatar"), updateAvatar);
router.put("/resume", uploadResumeMw.single("resume"), uploadResume);

// Student dashboard stats
router.get("/dashboard/student", authorise("student"), getStudentDashboard);

// Save / unsave internships
router.get("/saved", authorise("student"), getSavedInternships);
router.patch("/saved/:internshipId", authorise("student"), toggleSavedInternship);

// Admin-only routes
router.get("/", authorise("admin"), getAllUsers);
router.patch("/:id/toggle-status", authorise("admin"), toggleUserStatus);

module.exports = router;
