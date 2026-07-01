import api from "./api";

export const authService = {
  /** Register a new user */
  register: (data) => api.post("/auth/register", data),

  /** Log in */
  login: (data) => api.post("/auth/login", data),

  /** Request a password reset email */
  forgotPassword: (data) => api.post("/auth/forgot-password", data),

  /** Reset password with a token */
  resetPassword: (data) => api.post("/auth/reset-password", data),

  /** Log out (clears cookie server-side) */
  logout: () => api.post("/auth/logout"),

  /** Get the currently authenticated user */
  getMe: () => api.get("/auth/me"),
};
