/**
 * seed-admin.js
 * Run once to create the admin user in MongoDB.
 * Usage: node seed-admin.js
 */

require("dotenv").config({ path: "./backend/.env" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MONGO_URI = process.env.MONGO_URI;

const userSchema = new mongoose.Schema({
  name:       String,
  email:      { type: String, unique: true, lowercase: true },
  password:   { type: String, select: false },
  role:       { type: String, enum: ["student", "recruiter", "admin"], default: "student" },
  isVerified: { type: Boolean, default: false },
  isActive:   { type: Boolean, default: true },
  avatar:     { url: String, publicId: String },
  profile:    Object,
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

async function seedAdmin() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ Connected to MongoDB");

  const adminEmail    = "admin@internconnect.com";
  const adminPassword = "Admin@123456";
  const adminName     = "Super Admin";

  const existing = await User.findOne({ email: adminEmail });
  if (existing) {
    console.log("⚠️  Admin already exists with email:", adminEmail);
    process.exit(0);
  }

  const hashed = await bcrypt.hash(adminPassword, 12);

  await User.create({
    name:       adminName,
    email:      adminEmail,
    password:   hashed,
    role:       "admin",
    isVerified: true,
    isActive:   true,
  });

  console.log("🎉 Admin user created successfully!");
  console.log("   Email   :", adminEmail);
  console.log("   Password:", adminPassword);
  console.log("   Role    : admin");
  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
