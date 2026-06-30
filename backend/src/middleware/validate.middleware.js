const { validationResult } = require("express-validator");
const { ApiError } = require("../utils/apiResponse");

/**
 * validate — Runs after express-validator chains.
 * If there are errors, throws a formatted ApiError (400).
 * Otherwise calls next().
 *
 * Usage:
 *   router.post("/register", [...validationChain], validate, registerController);
 */
const validate = (req, _res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));
    throw new ApiError(400, "Validation failed", errorMessages);
  }
  next();
};

module.exports = validate;
