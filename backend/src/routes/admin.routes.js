const express = require("express");
const {
  getDashboardStats,
  toggleFeatureInternship,
  verifyCompany,
} = require("../controllers/admin.controller");
const { protect, authorise } = require("../middleware/auth.middleware");

const router = express.Router();

// All admin routes: must be authenticated + admin role
router.use(protect, authorise("admin"));

router.get("/stats", getDashboardStats);
router.patch("/internships/:id/feature", toggleFeatureInternship);
router.patch("/companies/:id/verify", verifyCompany);

module.exports = router;
