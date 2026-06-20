import axios from "axios";
import { useEffect, useState } from "react";
import { AuthBridge } from "../utils/api/authBridge";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  const setAccessToken = (t: string | null) => {
    setAccessTokenState(t);
  };

  const SignOut = async () => {
    setAccessTokenState(null);
    setAdminUser(null);
    window.location.replace("/");
  };

  // On mount: try to silently restore the session using the httpOnly refresh cookie.
  // Uses raw axios (no interceptors) so a missing cookie just silently fails —
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_URL + "/api/v1";
        const res = await axios.post(
          `${baseURL}/members/refresh`,
          {},
          { withCredentials: true }
        );
        const { token, adminId, role } = res.data;
        if (token) setAccessTokenState(token);
        if (adminId && role) setAdminUser({ id: adminId, role: role as Role });
      } catch {
        // No valid refresh cookie — stay logged out, show login page
      } finally {
        setIsBootstrapping(false);
      }
    };
    bootstrap();
  }, []);

  // register context functions so axios can call them
  useEffect(() => {
    AuthBridge.register({
      setToken: setAccessToken,
      logout: SignOut,
      getToken: () => accessToken,
      setAdminUser: setAdminUser,
    });
  }, [accessToken]);

  // Don't render children until we know whether we have a session or not.
  // This prevents a flash of the login page for already-authenticated users.
  if (isBootstrapping) return null;

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, SignOut, adminUser, setAdminUser }}>
      {children}
    </AuthContext.Provider>
  );
};