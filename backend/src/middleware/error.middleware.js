const { ApiError } = require("../utils/apiResponse");

/**
 * asyncHandler — wraps async route handlers to forward errors to Express.
 * Usage: router.get("/", asyncHandler(async (req, res) => { ... }));
 *
 * @param {Function} fn - Async controller function
 * @returns {Function}
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * Global error-handling middleware.
 * Must be the LAST middleware registered in app.js.
 */
const errorHandler = (err, req, res, _next) => {
  let error = err;

  // ── Not an ApiError? Wrap it ───────────────────────────────────
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    error = new ApiError(statusCode, message, error?.errors || []);
  }

  // ── Mongoose CastError (invalid ObjectId) ─────────────────────
  if (err.name === "CastError") {
    error = new ApiError(400, `Invalid ${err.path}: ${err.value}`);
  }

  // ── Mongoose duplicate key ────────────────────────────────────
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = new ApiError(409, `${field} already exists.`);
  }

  // ── Mongoose validation error ─────────────────────────────────
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    error = new ApiError(400, messages.join(", "));
  }

  // ── JWT errors ────────────────────────────────────────────────
  if (err.name === "JsonWebTokenError") {
    error = new ApiError(401, "Invalid token. Please log in again.");
  }
  if (err.name === "TokenExpiredError") {
    error = new ApiError(401, "Your token has expired. Please log in again.");
  }

  const response = {
    success: false,
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  };

  return res.status(error.statusCode).json(response);
};

module.exports = { asyncHandler, errorHandler };
