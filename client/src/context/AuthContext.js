import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("gradeTrackerUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("gradeTrackerUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("gradeTrackerUser");
    }
  }, [user]);

  const register = async (formData) => {
    setAuthLoading(true);
    try {
      const response = await api.post("/auth/register", formData);
      setUser(response.data);
      toast.success("Registration successful");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async (formData) => {
    setAuthLoading(true);
    try {
      const response = await api.post("/auth/login", formData);
      setUser(response.data);
      toast.success("Login successful");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    toast.info("Logged out successfully");
  };

  const value = useMemo(
    () => ({
      user,
      authLoading,
      register,
      login,
      logout,
      isAuthenticated: Boolean(user)
    }),
    [user, authLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
