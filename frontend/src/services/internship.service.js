import api from "./api";

export const internshipService = {
  /** Get all internships (with optional query params) */
  getAll: (params) => api.get("/internships", { params }),

  /** Get a single internship by ID */
  getById: (id) => api.get(`/internships/${id}`),

  /** Create a new internship (recruiter) */
  create: (data) => api.post("/internships", data),

  /** Update an internship (recruiter) */
  update: (id, data) => api.put(`/internships/${id}`, data),

  /** Delete an internship (recruiter) */
  remove: (id) => api.delete(`/internships/${id}`),

  /** Get the recruiter's own listings */
  getMyListings: () => api.get("/internships/my/listings"),
};
