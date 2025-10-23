import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
import { Users, FolderKanban, Code2, Trophy, Terminal } from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";

const Dashboardlayout = () => {
  const location = useLocation();
  const isMainDashboard = location.pathname === "/Dashboard";

  const stats = [
    { label: "Members", value: 48, icon: <Users className="w-8 h-8" /> },
    { label: "Projects", value: 12, icon: <FolderKanban className="w-8 h-8" /> },
    { label: "DSA", value: 327, icon: <Code2 className="w-8 h-8" /> },
    { label: "Achievements", value: 21, icon: <Trophy className="w-8 h-8" /> },
  ];

  return (
    <div className="flex min-h-screen text-black bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="ml-64 flex-1 relative min-h-screen overflow-hidden pt-[80px] space-y-6">

        {/* DASHBOARD HEADER (only on main dashboard) */}
        {isMainDashboard && (
          <div className="fixed top-0 left-[260px] w-[calc(100%-260px)] bg-black border-4 border-black px-8 py-4 shadow-[8px_8px_0_0_#00FFFF] z-50">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10" /> {/* back button space */}
              <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl font-extrabold text-white tracking-tight">{/* optional title */}</h1>
                <p className="text-xl font-bold text-cyan-400 tracking-wider uppercase">
                  Dashboard
                </p>
              </div>
              <div className="w-10 h-10 bg-cyan-400 border-2 border-black flex items-center justify-center shadow-[3px_3px_0_0_#000]">
                <Terminal className="w-5 h-5 text-black" />
              </div>
            </div>
            <div className="mt-3 w-full h-[3px] bg-cyan-400 border-2 border-black"></div>
          </div>
        )}

        {/* DASHBOARD STATS GRID (only on main dashboard) */}
        {isMainDashboard && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              {stats.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="bg-white border-4 border-black rounded-2xl p-10 shadow-[8px_8px_0_#00FFFF,12px_12px_0_#000] hover:shadow-[4px_4px_0_#00FFFF,6px_6px_0_#000] transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-16 h-16 bg-black text-cyan-400 flex items-center justify-center border-2 border-cyan-400 rounded-lg">
                      {item.icon}
                    </div>
                    <span className="text-5xl font-black text-black">{item.value}</span>
                  </div>
                  <h3 className="text-2xl font-black text-black uppercase tracking-wide">
                    {item.label}
                  </h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* NESTED ROUTES */}
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboardlayout;
