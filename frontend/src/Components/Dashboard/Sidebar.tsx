import { Award, CodeXml, Star, Trash, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-64 bg-black text-white p-6 fixed left-0 shadow-[8px_0_0_#00FFFF] z-50 border-r-2 border-cyan-400">
      {/* Logo */}
      <div className="flex items-center justify-center mb-10">
        <h1 className="text-3xl font-extrabold text-cyan-400 tracking-widest">COC.ADMIN</h1>
      </div>

      {/* Dashboard */}
      <Link
        to="/Dashboard/dashboard"
        className="flex items-center gap-3 text-lg font-semibold mb-6 transition-all hover:text-cyan-400"
      >
        <Star className="w-6 h-6 text-cyan-400" />
        <span>Dashboard</span>
      </Link>

      {/* Achievement */}
      <Link
        to="/Dashboard/achievement"
        className="flex items-center gap-3 text-lg font-semibold mb-6 transition-all hover:text-cyan-400"
      >
        <Award className="w-6 h-6 text-cyan-400" />
        <span>Achievement</span>
      </Link>

      {/* Members */}
      <Link
        to="/Dashboard/members"
        className="flex items-center gap-3 text-lg font-semibold mb-6 transition-all hover:text-cyan-400"
      >
        <UserRound className="w-6 h-6 text-cyan-400" />
        <span>Members</span>
      </Link>

      {/* Projects */}
      <Link
        to="/Dashboard/projects"
        className="flex items-center gap-3 text-lg font-semibold mb-6 transition-all hover:text-cyan-400"
      >
        <Star className="w-6 h-6 text-cyan-400" />
        <span>Projects</span>
      </Link>

      {/* DSA Questions */}
      <Link
        to="/Dashboard/dsa"
        className="flex items-center gap-3 text-lg font-semibold mb-6 transition-all hover:text-cyan-400"
      >
        <CodeXml className="w-6 h-6 text-cyan-400" />
        <span>DSA Questions</span>
      </Link>

      {/* Logout */}
      <button
        className="flex items-center gap-3 text-lg font-semibold mt-10 py-2 px-3 rounded-md border-2 border-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/');
        }}
      >
        <Trash className="w-6 h-6 text-cyan-400 group-hover:text-black" />
        <span>Log Out</span>
      </button>
    </div>
  );
};

export default Sidebar;
