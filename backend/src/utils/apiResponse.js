/**
 * Standardised API response classes for InternConnect.
 *
 * Usage:
 *   res.status(200).json(new ApiResponse(200, data, "Fetched successfully"));
 *   throw new ApiError(404, "Resource not found");
 */

// ─── Success Response ─────────────────────────────────────────────
class ApiResponse {
  /**
   * @param {number} statusCode - HTTP status code (2xx)
   * @param {*}      data       - Payload to send back
   * @param {string} message    - Human-readable success message
   */
  constructor(statusCode, data, message = "Success") {
    this.success = true;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

// ─── Error Response ───────────────────────────────────────────────
class ApiError extends Error {
  /**
   * @param {number}   statusCode - HTTP status code (4xx / 5xx)
   * @param {string}   message    - Error message
   * @param {Array}    errors     - Optional array of validation errors
   * @param {string}   stack      - Optional custom stack trace
   */
  constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = { ApiResponse, ApiError };
