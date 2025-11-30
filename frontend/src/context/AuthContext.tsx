import { createContext, useContext} from "react";

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (t: string | null) => void;
  SignOut: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);


export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
