const mongoose = require("mongoose");
const { APPLICATION_STATUS } = require("../config/constants");

const applicationSchema = new mongoose.Schema(
  {
    // ─── References ───────────────────────────────────────────────
    internship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
      required: [true, "Internship reference is required"],
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Applicant reference is required"],
    },

    // ─── Application Content ─────────────────────────────────────
    coverLetter: {
      type: String,
      maxlength: [2000, "Cover letter cannot exceed 2000 characters"],
    },
    resume: {
      url: { type: String, required: [true, "Resume URL is required"] },
      publicId: { type: String, default: "" }, // Cloudinary public_id
    },

    // ─── Status ──────────────────────────────────────────────────
    status: {
      type: String,
      enum: Object.values(APPLICATION_STATUS),
      default: APPLICATION_STATUS.PENDING,
    },

    // ─── Recruiter Notes (internal) ───────────────────────────────
    recruiterNote: {
      type: String,
      maxlength: 500,
      select: false, // Hidden from applicant queries
    },

    // ─── Timestamps ───────────────────────────────────────────────
    reviewedAt: Date,
    decisionAt: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ─── Indexes ──────────────────────────────────────────────────────
// One applicant can apply to each internship only once
applicationSchema.index(
  { internship: 1, applicant: 1 },
  { unique: true }
);
applicationSchema.index({ applicant: 1 });
applicationSchema.index({ internship: 1, status: 1 });

// ─── Post-save: Increment internship applicationCount ────────────
applicationSchema.post("save", async function (doc) {
  try {
    const Internship = mongoose.model("Internship");
    await Internship.findByIdAndUpdate(doc.internship, {
      $inc: { applicationCount: 1 },
    });
  } catch (_err) {
    // Non-critical — don't block the response
  }
});

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
