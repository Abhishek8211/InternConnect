const express = require("express");

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const internshipRoutes = require("./internship.routes");
const applicationRoutes = require("./application.routes");
const adminRoutes = require("./admin.routes");

const router = express.Router();

// ─── Mount all route groups ───────────────────────────────────────
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/internships", internshipRoutes);
router.use("/applications", applicationRoutes);
router.use("/admin", adminRoutes);

// ─── Health check ─────────────────────────────────────────────────
router.get("/health", (_req, res) => {
  res.status(200).json({ success: true, message: "InternConnect API is running 🚀", timestamp: new Date().toISOString() });
});

module.exports = router;
