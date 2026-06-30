const cloudinary = require("cloudinary");

/**
 * Configure the Cloudinary SDK with credentials from environment variables.
 * Called once at server startup (from app.js or server.js).
 */
const configureCloudinary = () => {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  console.log("✅ Cloudinary configured.");
};

module.exports = { cloudinary: cloudinary.v2, configureCloudinary };
