import api from "./api";

export const applicationService = {
  /** Apply to an internship (multipart/form-data for resume upload) */
  apply: (formData) =>
    api.post("/applications", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  /** Get the logged-in student's applications */
  getMyApplications: () => api.get("/applications/my"),

  /** Get all applications for a specific internship (recruiter) */
  getByInternship: (internshipId) =>
    api.get(`/applications/internship/${internshipId}`),

  /** Get all applications across all listings for a recruiter */
  getApplicationsForMyListings: () => api.get("/applications/my-listings"),

  /** Update application status (recruiter/admin) */
  updateStatus: (id, data) => api.patch(`/applications/${id}/status`, data),

  /** Withdraw an application (student) */
  withdraw: (id) => api.delete(`/applications/${id}`),
};
