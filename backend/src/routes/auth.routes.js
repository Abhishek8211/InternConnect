const express = require("express");
const { body } = require("express-validator");
const {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const router = express.Router();

// ─── Validation chains ────────────────────────────────────────────
const registerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 60 }),
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("role")
    .optional()
    .isIn(["student", "recruiter"])
    .withMessage("Role must be student or recruiter"),
];

const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

const forgotPasswordValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
];

const resetPasswordValidation = [
  body("token").notEmpty().withMessage("Reset token is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

// ─── Routes ───────────────────────────────────────────────────────
router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);
router.post(
  "/forgot-password",
  forgotPasswordValidation,
  validate,
  forgotPassword,
);
router.post(
  "/reset-password",
  resetPasswordValidation,
  validate,
  resetPassword,
);
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);

module.exports = router;
