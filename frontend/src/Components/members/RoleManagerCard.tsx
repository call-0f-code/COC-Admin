import {
  User,
  Mail,
  Shield,
  ChevronDown,
  Loader2,
  Github,
  Linkedin,
  GraduationCap,
  BookOpen,
  Hash,
  Crown,
  Ghost,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface RoleManagerCardProps {
  member: Member;
  onRoleChange: (memberId: string, role: Role) => void;
  isUpdating: boolean;
  onGhost: () => void;
  isGhosting: boolean;
}

const ALL_ROLES: { value: Role; label: string; color: string; bg: string; border: string }[] = [
  {
    value: "SUPER_ADMIN",
    label: "Super Admin",
    color: "text-purple-700",
    bg: "bg-purple-50",
    border: "border-purple-400",
  },
  {
    value: "ADMIN",
    label: "Admin",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-400",
  },
  {
    value: "FOUNDER",
    label: "Founder",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-400",
  },
  {
    value: "MEMBER",
    label: "Member",
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-400",
  },
];

const CURRENT_ROLE_STYLE: Record<Role, { accent: string; badge: string }> = {
  SUPER_ADMIN: { accent: "bg-purple-400",  badge: "bg-purple-100 border-purple-400 text-purple-700" },
  ADMIN:       { accent: "bg-blue-400",    badge: "bg-blue-100 border-blue-400 text-blue-700" },
  FOUNDER:     { accent: "bg-amber-400",   badge: "bg-amber-100 border-amber-400 text-amber-700" },
  MEMBER:      { accent: "bg-green-400",   badge: "bg-green-100 border-green-400 text-green-700" },
};

export const RoleManagerCard: React.FC<RoleManagerCardProps> = ({
  member,
  onRoleChange,
  isUpdating,
  onGhost,
  isGhosting,
}) => {
  const [selectedRole, setSelectedRole] = useState<Role>(member.role ?? "MEMBER");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentRoleStyle = CURRENT_ROLE_STYLE[member.role ?? "MEMBER"];
  const selectedRoleInfo = ALL_ROLES.find((r) => r.value === selectedRole)!;
  const hasChanged = selectedRole !== (member.role ?? "MEMBER");

  return (
    <motion.div
      className="w-full max-w-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative bg-white border-4 border-black shadow-[6px_6px_0_0_#000000] rounded-xl overflow-visible"
      >
        {/* Top accent bar — color matches current role */}
        <div className={`absolute top-0 left-0 w-full h-2 ${currentRoleStyle.accent}`} />

        <div className="relative p-6 pt-8 flex flex-col gap-4 z-10">

          {/* Header */}
          <div className="flex items-center gap-4 mt-1">
            {member.profilePhoto ? (
              <img
                src={member.profilePhoto}
                alt={member.name}
                className="w-14 h-14 border-4 border-black rounded-md object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-14 h-14 bg-gray-200 border-4 border-black flex items-center justify-center rounded-md flex-shrink-0">
                <User className="w-7 h-7 text-black" strokeWidth={3} />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-black text-black tracking-tight uppercase leading-tight truncate">
                {member.name}
              </h3>
              {/* Current role badge */}
              <span
                className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 border-2 rounded-sm text-xs font-black uppercase tracking-widest ${currentRoleStyle.badge}`}
              >
                <Shield className="w-3 h-3" strokeWidth={2.5} />
                {member.role ?? "MEMBER"}
              </span>
            </div>
          </div>

          {/* Info strip */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-1.5 bg-gray-50 border-2 border-black px-2 py-1.5 rounded-md">
              <Mail className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" strokeWidth={2.5} />
              <span className="text-xs text-gray-600 font-semibold truncate">{member.email}</span>
            </div>
            {member.rollNumber && (
              <div className="flex items-center gap-1.5 bg-gray-50 border-2 border-black px-2 py-1.5 rounded-md">
                <Hash className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" strokeWidth={2.5} />
                <span className="text-xs text-gray-600 font-semibold truncate">{member.rollNumber}</span>
              </div>
            )}
            {member.branch && (
              <div className="flex items-center gap-1.5 bg-gray-50 border-2 border-black px-2 py-1.5 rounded-md">
                <BookOpen className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" strokeWidth={2.5} />
                <span className="text-xs text-gray-600 font-semibold truncate">{member.branch}</span>
              </div>
            )}
            {member.passoutYear && (
              <div className="flex items-center gap-1.5 bg-gray-50 border-2 border-black px-2 py-1.5 rounded-md">
                <GraduationCap className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" strokeWidth={2.5} />
                <span className="text-xs text-gray-600 font-semibold truncate">{member.passoutYear}</span>
              </div>
            )}
            {member.github && (
              <div className="flex items-center gap-1.5 bg-gray-50 border-2 border-black px-2 py-1.5 rounded-md">
                <Github className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" strokeWidth={2.5} />
                <a
                  href={member.github.startsWith("http") ? member.github : `https://github.com/${member.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-600 font-semibold truncate hover:underline"
                >
                  {member.github}
                </a>
              </div>
            )}
            {member.linkedin && (
              <div className="flex items-center gap-1.5 bg-gray-50 border-2 border-black px-2 py-1.5 rounded-md">
                <Linkedin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" strokeWidth={2.5} />
                <a
                  href={member.linkedin.startsWith("http") ? member.linkedin : `https://linkedin.com/in/${member.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-600 font-semibold truncate hover:underline"
                >
                  {member.linkedin}
                </a>
              </div>
            )}
          </div>

          {/* Role selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black text-gray-500 uppercase tracking-wider flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" strokeWidth={3} />
              Assign Role
            </label>

            {/* Custom dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className={`w-full flex items-center justify-between px-3 py-2.5 border-4 border-black font-black text-sm uppercase tracking-wide
                  shadow-[3px_3px_0_0_#000] hover:shadow-[1px_1px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5
                  transition-all duration-100 ${selectedRoleInfo.bg} ${selectedRoleInfo.color}`}
              >
                <span>{selectedRoleInfo.label}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  strokeWidth={3}
                />
              </button>

              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute z-50 w-full top-full mt-1 border-4 border-black bg-white shadow-[4px_4px_0_0_#000]"
                >
                  {ALL_ROLES.map((role) => (
                    <button
                      key={role.value}
                      onClick={() => {
                        setSelectedRole(role.value);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 font-black text-sm uppercase tracking-wide border-b-2 border-black last:border-b-0
                        transition-colors duration-100 ${role.bg} ${role.color} hover:opacity-80
                        ${selectedRole === role.value ? "border-l-4" : ""}`}
                    >
                      {role.label}
                      {member.role === role.value && (
                        <span className="ml-2 text-xs opacity-60">(current)</span>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Apply role button */}
          <motion.button
            onClick={() => onRoleChange(member.id, selectedRole)}
            disabled={isUpdating || !hasChanged}
            whileTap={{ scale: 0.97 }}
            className={`w-full h-12 border-4 border-black font-black text-sm uppercase tracking-wide
              transition-all duration-150 shadow-[4px_4px_0_0_#000]
              active:shadow-none active:translate-x-1 active:translate-y-1
              flex items-center justify-center gap-3
              ${hasChanged
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }
              disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isUpdating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" strokeWidth={3} />
                <span>Updating...</span>
              </>
            ) : (
              <>
                <Shield className="w-4 h-4" strokeWidth={3} />
                <span>{hasChanged ? `Set as ${selectedRoleInfo.label}` : "No Changes"}</span>
              </>
            )}
          </motion.button>

          {/* Ghost button */}
          <motion.button
            onClick={onGhost}
            disabled={isGhosting}
            whileTap={{ scale: 0.97 }}
            className="w-full h-10 bg-white border-4 border-black font-black text-sm uppercase tracking-wide
              hover:bg-red-500 hover:text-white transition-all duration-150 shadow-[4px_4px_0_0_#000]
              active:shadow-none active:translate-x-1 active:translate-y-1
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-3"
          >
            {isGhosting ? (
              <><Loader2 className="w-4 h-4 animate-spin" strokeWidth={3} /><span>Ghosting...</span></>
            ) : (
              <><span>Ghost (Dead Zone)</span><Ghost className="w-4 h-4" strokeWidth={2.5} /></>
            )}
          </motion.button>
        </div>

        {/* Bottom accent */}
        <motion.div
          className={`absolute -bottom-2 -right-2 w-10 h-10 border-4 border-black rounded-md ${currentRoleStyle.accent}`}
          whileHover={{ scale: 1.3, rotate: 20 }}
        />
      </motion.div>
    </motion.div>
  );
};
