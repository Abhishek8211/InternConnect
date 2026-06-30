const jwt = require("jsonwebtoken");

/**
 * Generate a signed JWT for the given user ID.
 *
 * @param   {string|ObjectId} userId  - The user's MongoDB _id
 * @param   {string}          role    - The user's role (student | recruiter | admin)
 * @returns {string}                  - Signed JWT string
 */
const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

module.exports = generateToken;
