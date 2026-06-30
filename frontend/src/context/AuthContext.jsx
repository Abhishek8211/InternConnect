import { createContext, useState, useEffect, useCallback } from "react";
import { authService } from "@/services/auth.service";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]         = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ── Bootstrap: check if a session already exists ──────────────
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const storedUser = localStorage.getItem("ic_user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        // Optionally verify token with backend
        const res = await authService.getMe();
        setUser(res.data.data);
        localStorage.setItem("ic_user", JSON.stringify(res.data.data));
      } catch {
        setUser(null);
        localStorage.removeItem("ic_user");
      } finally {
        setIsLoading(false);
      }
    };
    bootstrap();
  }, []);

  // ── Login ──────────────────────────────────────────────────────
  const login = useCallback(async (credentials) => {
    const res = await authService.login(credentials);
    const loggedInUser = res.data.data.user;
    setUser(loggedInUser);
    localStorage.setItem("ic_user", JSON.stringify(loggedInUser));
    return loggedInUser;
  }, []);

  // ── Register ───────────────────────────────────────────────────
  const register = useCallback(async (userData) => {
    const res = await authService.register(userData);
    const newUser = res.data.data.user;
    setUser(newUser);
    localStorage.setItem("ic_user", JSON.stringify(newUser));
    return newUser;
  }, []);

  // ── Logout ─────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      localStorage.removeItem("ic_user");
    }
  }, []);

  // ── Update user (after profile edit) ──────────────────────────
  const updateUser = useCallback((updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("ic_user", JSON.stringify(updatedUser));
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
