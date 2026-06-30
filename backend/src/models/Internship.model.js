const mongoose = require("mongoose");
const { INTERNSHIP_TYPE, APPLICATION_STATUS } = require("../config/constants");

const internshipSchema = new mongoose.Schema(
  {
    // ─── Core Details ─────────────────────────────────────────────
    title: {
      type: String,
      required: [true, "Internship title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },
    responsibilities: [{ type: String, trim: true }],
    requirements: [{ type: String, trim: true }],

    // ─── Company ──────────────────────────────────────────────────
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company reference is required"],
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ─── Role Details ─────────────────────────────────────────────
    location: {
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true, default: "India" },
    },
    type: {
      type: String,
      enum: Object.values(INTERNSHIP_TYPE),
      required: [true, "Internship type is required"],
    },
    duration: {
      type: String,
      trim: true,
      required: [true, "Duration is required"],
    },
    stipend: {
      amount: { type: Number, default: 0 },
      currency: { type: String, default: "INR" },
      isPaid: { type: Boolean, default: true },
    },
    openings: { type: Number, default: 1, min: 1 },

    // ─── Skills & Categories ──────────────────────────────────────
    skillsRequired: [{ type: String, trim: true }],
    category: { type: String, trim: true },
    tags: [{ type: String, lowercase: true, trim: true }],

    // ─── Dates ───────────────────────────────────────────────────
    applicationDeadline: {
      type: Date,
      required: [true, "Application deadline is required"],
    },
    startDate: { type: Date },

    // ─── Status ──────────────────────────────────────────────────
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },

    // ─── AI Matching ─────────────────────────────────────────────
    aiScore: { type: Number, default: 0 }, // Reserved for AI relevance scoring
    viewCount: { type: Number, default: 0 },
    applicationCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ─── Indexes ──────────────────────────────────────────────────────
internshipSchema.index({ title: "text", description: "text", tags: "text" });
internshipSchema.index({ company: 1 });
internshipSchema.index({ postedBy: 1 });
internshipSchema.index({ isActive: 1, applicationDeadline: 1 });
internshipSchema.index({ skillsRequired: 1 });

// ─── Virtual: Is deadline passed ─────────────────────────────────
internshipSchema.virtual("isExpired").get(function () {
  return this.applicationDeadline < new Date();
});

const Internship = mongoose.model("Internship", internshipSchema);
module.exports = Internship;
