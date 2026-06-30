const jwt = require("jsonwebtoken");
const { ApiError } = require("../utils/apiResponse");
const { asyncHandler } = require("./error.middleware");
const User = require("../models/User.model");

/**
 * protect — Verifies JWT from Authorization header or cookie.
 * Attaches the decoded user document to req.user.
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Try Authorization header (Bearer token)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // 2. Fall back to HTTP-only cookie
  else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new ApiError(401, "Not authenticated. Please log in.");
  }

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Attach user to request (exclude password)
  const currentUser = await User.findById(decoded.id).select("-password");
  if (!currentUser) {
    throw new ApiError(401, "The user belonging to this token no longer exists.");
  }

  req.user = currentUser;
  next();
});

/**
 * authorise — Role-based access control factory.
 * Usage: router.delete("/", protect, authorise("admin"), handler)
 *
 * @param {...string} roles - Allowed roles
 * @returns {Function} Express middleware
 */
const authorise = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        403,
        `Access denied. Role '${req.user.role}' is not permitted to perform this action.`
      );
    }
    next();
  };
};

module.exports = { protect, authorise };
