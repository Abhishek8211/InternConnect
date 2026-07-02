import api from "./api";

export const userService = {
  /** Get the authenticated user's full profile */
  getProfile: () => api.get("/users/profile"),

  /** Update profile fields (name, profile.*) */
  updateProfile: (data) => api.put("/users/profile", data),

  /** Upload a new avatar image (multipart/form-data) */
  uploadAvatar: (formData) =>
    api.put("/users/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  /** Upload a resume PDF (multipart/form-data) */
  uploadResume: (formData) =>
    api.put("/users/resume", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  /** Get student dashboard stats (counts, trend chart, profile score) */
  getStudentDashboard: () => api.get("/users/dashboard/student"),

  /** Get recruiter dashboard stats */
  getRecruiterDashboard: () => api.get("/users/dashboard/recruiter"),

  /** Toggle save/unsave on an internship */
  toggleSaved: (internshipId) => api.patch(`/users/saved/${internshipId}`),

  /** Get all saved internships for the student */
  getSaved: () => api.get("/users/saved"),

  /** Get all users — Admin only (paginated) */
  getAllUsers: (params) => api.get("/users", { params }),

  /** Toggle a user's active status — Admin only */
  toggleUserStatus: (userId) => api.patch(`/users/${userId}/toggle-status`),
};
