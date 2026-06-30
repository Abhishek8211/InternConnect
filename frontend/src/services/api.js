import axios from "axios";

/**
 * Configured Axios instance for the InternConnect API.
 * Base URL is read from VITE_API_BASE_URL env var.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  withCredentials: true, // Send HTTP-only cookies
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// ── Request Interceptor ───────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    // If a token exists in localStorage (fallback), attach it
    const stored = localStorage.getItem("ic_user");
    if (stored) {
      const user = JSON.parse(stored);
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor ──────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // Session expired → redirect to login
    if (status === 401) {
      localStorage.removeItem("ic_user");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
