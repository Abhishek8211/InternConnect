const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    // ─── Identity ─────────────────────────────────────────────────
    name: {
      type: String,
      required: [true, "Company name is required"],
      unique: true,
      trim: true,
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // ─── Branding ─────────────────────────────────────────────────
    logo: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    coverImage: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },

    // ─── Info ─────────────────────────────────────────────────────
    description: {
      type: String,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    industry: { type: String, trim: true },
    size: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"],
    },
    founded: { type: Number },
    website: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, "Please enter a valid URL"],
    },

    // ─── Location ─────────────────────────────────────────────────
    headquarters: {
      city: String,
      state: String,
      country: { type: String, default: "India" },
    },

    // ─── Owner ───────────────────────────────────────────────────
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ─── Verification ────────────────────────────────────────────
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    // ─── Social ──────────────────────────────────────────────────
    socialLinks: {
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ─── Indexes ──────────────────────────────────────────────────────
companySchema.index({ name: "text", industry: "text" });
companySchema.index({ recruiter: 1 });
companySchema.index({ slug: 1 });

// ─── Pre-save: Auto-generate slug from name ────────────────────
companySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }
  next();
});

// ─── Virtual: Active internships count (populated separately) ────
companySchema.virtual("internships", {
  ref: "Internship",
  localField: "_id",
  foreignField: "company",
  justOne: false,
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
