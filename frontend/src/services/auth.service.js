import api from "./api";

export const authService = {
  /** Register a new user */
  register: (data) => api.post("/auth/register", data),

  /** Log in */
  login: (data) => api.post("/auth/login", data),

  /** Log out (clears cookie server-side) */
  logout: () => api.post("/auth/logout"),

  /** Get the currently authenticated user */
  getMe: () => api.get("/auth/me"),
};
