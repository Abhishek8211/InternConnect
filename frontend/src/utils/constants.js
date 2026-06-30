/**
 * Frontend-side constants for InternConnect.
 */

export const ROLES = Object.freeze({
  STUDENT:   "student",
  RECRUITER: "recruiter",
  ADMIN:     "admin",
});

export const APPLICATION_STATUS = Object.freeze({
  PENDING:     "pending",
  REVIEWED:    "reviewed",
  SHORTLISTED: "shortlisted",
  ACCEPTED:    "accepted",
  REJECTED:    "rejected",
});

export const INTERNSHIP_TYPE = Object.freeze({
  REMOTE:   "remote",
  ON_SITE:  "on-site",
  HYBRID:   "hybrid",
});

export const STATUS_COLORS = {
  pending:     "badge-warning",
  reviewed:    "badge-brand",
  shortlisted: "badge-accent",
  accepted:    "badge-success",
  rejected:    "badge-danger",
};

export const NAV_LINKS = {
  student: [
    { label: "Dashboard",    href: "/student/dashboard" },
    { label: "Browse",       href: "/internships" },
    { label: "Applications", href: "/student/applications" },
    { label: "Profile",      href: "/student/profile" },
  ],
  recruiter: [
    { label: "Dashboard", href: "/recruiter/dashboard" },
    { label: "Post",      href: "/recruiter/post" },
    { label: "Listings",  href: "/recruiter/listings" },
  ],
  admin: [
    { label: "Dashboard",    href: "/admin/dashboard" },
    { label: "Users",        href: "/admin/users" },
    { label: "Internships",  href: "/admin/internships" },
  ],
};

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const ALLOWED_RESUME_TYPES = ["application/pdf"];
export const MAX_FILE_SIZE_MB = 5;
