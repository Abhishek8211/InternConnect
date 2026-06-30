const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../config/cloudinary");
const { ApiError } = require("../utils/apiResponse");
const {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_RESUME_TYPES,
  MAX_FILE_SIZE_BYTES,
} = require("../config/constants");

// ─── Cloudinary storage for avatars / company logos ───────────────
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "internconnect/images",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

// ─── Cloudinary storage for resumes (PDF) ─────────────────────────
const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "internconnect/resumes",
    allowed_formats: ["pdf"],
    resource_type: "raw",
  },
});

// ─── File filter factory ──────────────────────────────────────────
const createFileFilter = (allowedTypes) => (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new ApiError(
        415,
        `Unsupported file type: ${file.mimetype}. Allowed: ${allowedTypes.join(", ")}`
      ),
      false
    );
  }
};

// ─── Multer instances ─────────────────────────────────────────────
const uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
  fileFilter: createFileFilter(ALLOWED_IMAGE_TYPES),
});

const uploadResume = multer({
  storage: resumeStorage,
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
  fileFilter: createFileFilter(ALLOWED_RESUME_TYPES),
});

module.exports = { uploadImage, uploadResume };
