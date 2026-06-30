/**
 * App-wide constants for InternConnect.
 * Import from here — never hardcode these values in controllers/routes.
 */

// ─── User Roles ────────────────────────────────────────────────────
const ROLES = Object.freeze({
  STUDENT: "student",
  RECRUITER: "recruiter",
  ADMIN: "admin",
});

// ─── Application Statuses ─────────────────────────────────────────
const APPLICATION_STATUS = Object.freeze({
  PENDING: "pending",
  REVIEWED: "reviewed",
  SHORTLISTED: "shortlisted",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
});

// ─── Internship Types ─────────────────────────────────────────────
const INTERNSHIP_TYPE = Object.freeze({
  REMOTE: "remote",
  ON_SITE: "on-site",
  HYBRID: "hybrid",
});

// ─── Internship Duration ──────────────────────────────────────────
const INTERNSHIP_DURATION = Object.freeze({
  ONE_MONTH: "1 month",
  TWO_MONTHS: "2 months",
  THREE_MONTHS: "3 months",
  SIX_MONTHS: "6 months",
});

// ─── Pagination ───────────────────────────────────────────────────
const PAGINATION = Object.freeze({
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 50,
});

// ─── File Uploads ─────────────────────────────────────────────────
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const ALLOWED_RESUME_TYPES = ["application/pdf"];
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// ─── Cookie Options ───────────────────────────────────────────────
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: Number(process.env.JWT_COOKIE_EXPIRES_IN || 7) * 24 * 60 * 60 * 1000,
};

module.exports = {
  ROLES,
  APPLICATION_STATUS,
  INTERNSHIP_TYPE,
  INTERNSHIP_DURATION,
  PAGINATION,
  ALLOWED_IMAGE_TYPES,
  ALLOWED_RESUME_TYPES,
  MAX_FILE_SIZE_BYTES,
  COOKIE_OPTIONS,
};
