
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { accessToken } = useAuth();

  // If no token, send to login page  
  if (!accessToken) return <Navigate to="/" replace />;

  return <Outlet />; // allow nested routes to render
}
