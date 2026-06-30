const express = require("express");
const {
  getAllInternships,
  getInternshipById,
  createInternship,
  updateInternship,
  deleteInternship,
  getMyListings,
} = require("../controllers/internship.controller");
const { protect, authorise } = require("../middleware/auth.middleware");

const router = express.Router();

// Public routes
router.get("/", getAllInternships);
router.get("/:id", getInternshipById);

// Protected routes
router.use(protect);
router.get("/my/listings", authorise("recruiter", "admin"), getMyListings);
router.post("/", authorise("recruiter", "admin"), createInternship);
router.put("/:id", authorise("recruiter", "admin"), updateInternship);
router.delete("/:id", authorise("recruiter", "admin"), deleteInternship);

module.exports = router;
