import { createContext, useState, useEffect, useCallback } from "react";
import { authService } from "@/services/auth.service";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ── Bootstrap: verify a previously saved session only when we have one ──
  useEffect(() => {
    const bootstrap = async () => {
      const storedUser = localStorage.getItem("ic_user");

      if (!storedUser) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        const res = await authService.getMe();
        const freshUser = res.data.data;
        setUser(freshUser);
        localStorage.setItem("ic_user", JSON.stringify(freshUser));
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
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
