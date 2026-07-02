const express = require("express");
const {
  applyToInternship,
  getMyApplications,
  getApplicationsByInternship,
  getApplicationsForMyListings,
  updateApplicationStatus,
  withdrawApplication,
} = require("../controllers/application.controller");
const { protect, authorise } = require("../middleware/auth.middleware");
const { uploadResume } = require("../middleware/upload.middleware");

const router = express.Router();

router.use(protect);

router.post("/", authorise("student"), uploadResume.single("resume"), applyToInternship);
router.get("/my", authorise("student"), getMyApplications);
router.get("/my-listings", authorise("recruiter", "admin"), getApplicationsForMyListings);
router.get("/internship/:internshipId", authorise("recruiter", "admin"), getApplicationsByInternship);
router.patch("/:id/status", authorise("recruiter", "admin"), updateApplicationStatus);
router.delete("/:id", authorise("student"), withdrawApplication);

module.exports = router;
