import { useEffect, useState } from "react";
import { AuthBridge } from "../utils/api/authBridge";
import { AuthContext } from "./AuthContext";


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const setAccessToken = (t: string | null) => {
    setAccessTokenState(t);
  };

  const SignOut = async() => {
    setAccessTokenState(null);
    window.location.replace("/");
  };

  // register context functions so axios can call them
  useEffect(() => {
    AuthBridge.register({
      setToken: setAccessToken,
      logout:SignOut,
      getToken: () => accessToken,
    });
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, SignOut }}>
      {children}
    </AuthContext.Provider>
  );
};