const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ROLES } = require("../config/constants");

const userSchema = new mongoose.Schema(
  {
    // ─── Basic Info ──────────────────────────────────────────────
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [60, "Name cannot exceed 60 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // Never return password in queries by default
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.STUDENT,
    },

    // ─── Avatar ──────────────────────────────────────────────────
    avatar: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" }, // Cloudinary public_id
    },

    // ─── Student Profile ─────────────────────────────────────────
    profile: {
      headline: { type: String, maxlength: 120 },
      bio: { type: String, maxlength: 500 },
      skills: [{ type: String, trim: true }],
      education: [
        {
          institution: String,
          degree: String,
          field: String,
          startYear: Number,
          endYear: Number,
        },
      ],
      resume: {
        url: { type: String, default: "" },
        publicId: { type: String, default: "" },
      },
      socialLinks: {
        linkedin: { type: String, default: "" },
        github: { type: String, default: "" },
        portfolio: { type: String, default: "" },
      },
    },

    // ─── Account State ────────────────────────────────────────────
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },

    // ─── Password Reset ───────────────────────────────────────────
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true, // createdAt, updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ─── Indexes ──────────────────────────────────────────────────────
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

// ─── Pre-save Hook: Hash password ─────────────────────────────────
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// ─── Instance Method: Compare password ───────────────────────────
userSchema.methods.matchPassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// ─── Virtual: Full avatar URL fallback ───────────────────────────
userSchema.virtual("avatarUrl").get(function () {
  return this.avatar?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(this.name)}&background=4f46e5&color=fff`;
});

const User = mongoose.model("User", userSchema);
module.exports = User;
