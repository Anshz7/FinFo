// context/auth.js
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAdminProfile, adminLogout } from "../api.service"; // Import adminLogout

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadAdmin() {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const adminData = await getAdminProfile(token);
        setAdmin(adminData);

        if (router.pathname === "/admin") {
          router.push("/admin/dashboard");
        }
      } catch (error) {
        console.error("Session validation failed:", error);
        localStorage.removeItem("adminToken");
      } finally {
        setIsLoading(false);
      }
    }

    loadAdmin();
  }, [router]);

  const login = (token, adminData) => {
    localStorage.setItem("adminToken", token);
    setAdmin(adminData);
    router.push("/admin/dashboard");
  };

  // context/auth.js - Update logout function
const logout = async () => {
  try {
    await adminLogout();
  } catch (error) {
    console.error('Logout error:', error);
    // Consider adding error toast/notification here
  } finally {
    // Always clear local state
    localStorage.removeItem('adminToken');
    setAdmin(null);
    // Redirect to login after state cleanup
    router.push('/admin');
  }
};

  return (
    <AuthContext.Provider
      value={{ admin, isLoading, login, logout, isAuthenticated: !!admin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
