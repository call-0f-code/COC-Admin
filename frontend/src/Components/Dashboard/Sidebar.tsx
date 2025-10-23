import { Award, CodeXml, LayoutDashboard, LogOut, Users, FolderKanban } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/Dashboard", icon: <LayoutDashboard /> },
    { name: "Achievements", path: "/Dashboard/achievements", icon: <Award /> },
    { name: "Members", path: "/Dashboard/members", icon: <Users /> },
    { name: "Projects", path: "/Dashboard/projects", icon: <FolderKanban /> },
    { name: "DSA", path: "/Dashboard/dsa", icon: <CodeXml /> },
  ];

  return (
    <div className="h-screen w-64 bg-white text-black fixed left-0 top-0 border-r-4 border-cyan-400 flex flex-col shadow-[8px_0_0_#000,12px_0_0_#00FFFF]">
      {/* Header / Logo */}
      <div className="p-6 border-b-4 border-black">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-black border-4 border-cyan-400 text-cyan-400 font-black text-center py-3 tracking-widest shadow-[4px_4px_0_0_#000,6px_6px_0_0_#00FFFF]"
        >
          COC.ADMIN
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-4 p-6">
        {links.map((link, i) => {
          const active = location.pathname === link.path;
          return (
            <motion.div
              key={i}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 150 }}
            >
              <Link
                to={link.path}
                className={`flex items-center gap-3 font-bold px-4 py-3 border-2 border-black rounded-md transition-all
                  ${
                    active
                      ? "bg-cyan-400 text-black shadow-[3px_3px_0_0_#000,5px_5px_0_0_#00FFFF]"
                      : "bg-black text-white hover:bg-cyan-400 hover:text-black shadow-[3px_3px_0_0_#000,5px_5px_0_0_#00FFFF]"
                  }`}
              >
                <div className="w-5 h-5">{link.icon}</div>
                <span>{link.name}</span>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-6 border-t-4 border-black">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          className="w-full flex items-center justify-center gap-3 bg-cyan-400 border-4 border-black text-black font-black px-4 py-3 shadow-[4px_4px_0_0_#000,6px_6px_0_0_#00FFFF] hover:bg-black hover:text-cyan-400 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>LOGOUT</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
