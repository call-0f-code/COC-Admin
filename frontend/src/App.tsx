import { Toaster } from "react-hot-toast";
import "./App.css";
import Authentication from "./pages/Authentication";
import DsaDashboard from "./pages/DsaDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProjectDashboard from "./pages/ProjectDashboard";

import { Routes, Route } from "react-router-dom";
import AchievementPage from "./pages/AchievementPage";
import Dashboardlayout from "./Components/Dashboard/Dashboardlayout";
import { GeometricBackground } from "./Components/common/GeometricBackground";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <>
      <div className="min-h-screen relative">
        <GeometricBackground />

        <Routes>
          {/* LOGIN / AUTH */}
          <Route path="/" element={<Authentication />} />

          {/* MAIN DASHBOARD LAYOUT */}
          <Route element={<ProtectedRoute/>}>

          <Route path="/Dashboard" element={<Dashboardlayout />}>

            <Route path="achievements" element={<AchievementPage />} />
            <Route path="members" element={<AdminDashboard />} />
            <Route path="projects" element={<ProjectDashboard />} />
            <Route path="dsa" element={<DsaDashboard />} />
          </Route>
        </Route>
        </Routes>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
