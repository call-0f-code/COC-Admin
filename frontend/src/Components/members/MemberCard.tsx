import {
  Loader2,
  Verified,
  Mail,
  User,
  Ghost,
  Github,
  Linkedin,
  Twitter,
  GraduationCap,
  Phone,
  BookOpen,
  Calendar,
  Hash,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface MemberCardProps {
  member: Member;
  onApprove: (memberId: string) => void;
  isApproving: boolean;
  onGhost: () => void;
  isGhosting: boolean;
}

const ROLE_STYLE: Record<NonNullable<Member["role"]>, { accent: string; badge: string }> = {
  SUPER_ADMIN: { accent: "bg-purple-400", badge: "bg-purple-100 border-purple-400 text-purple-700" },
  ADMIN:       { accent: "bg-blue-400",   badge: "bg-blue-100 border-blue-400 text-blue-700" },
  FOUNDER:     { accent: "bg-amber-400",  badge: "bg-amber-100 border-amber-400 text-amber-700" },
  MEMBER:      { accent: "bg-green-400",  badge: "bg-green-100 border-green-400 text-green-700" },
};

const Chip = ({
  icon: Icon,
  value,
  href,
}: {
  icon: React.ElementType;
  value?: string | null;
  href?: string;
}) => {
  if (!value) return null;
  return (
    <div className="flex items-center gap-1.5 bg-gray-50 border-2 border-black px-2 py-1.5 rounded-md">
      <Icon className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" strokeWidth={2.5} />
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-cyan-600 font-semibold truncate hover:underline flex items-center gap-1"
        >
          {value}
          <ExternalLink className="w-3 h-3 flex-shrink-0" />
        </a>
      ) : (
        <span className="text-xs text-gray-600 font-semibold truncate">{value}</span>
      )}
    </div>
  );
};

export const MemberCard: React.FC<MemberCardProps> = ({
  member,
  onApprove,
  isApproving,
  onGhost,
  isGhosting,
}) => {
  const [expanded, setExpanded] = useState(false);
  const roleStyle = member.role ? ROLE_STYLE[member.role] : null;
  const accentColor = roleStyle?.accent ?? "bg-cyan-400";

  const hasExtended =
    member.bio ||
    member.twitter ||
    member.phone ||
    member.year ||
    (member.skills && member.skills.length > 0);

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
        {/* Top accent bar */}
        <div className={`absolute top-0 left-0 w-full h-2 ${accentColor}`} />

        {/* Pending badge */}
        <div className="absolute top-3 right-4 flex items-center gap-1 bg-cyan-400 border-2 border-black px-2 py-0.5 rounded-sm z-20">
          <span className="text-xs font-black text-black uppercase tracking-widest">Pending</span>
        </div>

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
              <div className="w-14 h-14 bg-cyan-400 border-4 border-black flex items-center justify-center rounded-md flex-shrink-0">
                <User className="w-7 h-7 text-black" strokeWidth={3} />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-black text-black tracking-tight uppercase leading-tight truncate">
                {member.name}
              </h3>
              {roleStyle ? (
                <span className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 border-2 rounded-sm text-xs font-black uppercase tracking-widest ${roleStyle.badge}`}>
                  <Shield className="w-3 h-3" strokeWidth={2.5} />
                  {member.role}
                </span>
              ) : (
                member.createdAt && (
                  <p className="text-xs text-gray-400 font-semibold mt-1">
                    Applied {new Date(member.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                )
              )}
            </div>
          </div>

          {/* Info chip grid */}
          <div className="grid grid-cols-2 gap-2">
            <Chip icon={Mail} value={member.email} />
            <Chip icon={Hash} value={member.rollNumber} />
            <Chip icon={BookOpen} value={member.branch} />
            <Chip icon={GraduationCap} value={member.passoutYear} />
            <Chip
              icon={Github}
              value={member.github}
              href={member.github?.startsWith("http") ? member.github : member.github ? `https://github.com/${member.github}` : undefined}
            />
            <Chip
              icon={Linkedin}
              value={member.linkedin}
              href={member.linkedin?.startsWith("http") ? member.linkedin : member.linkedin ? `https://linkedin.com/in/${member.linkedin}` : undefined}
            />
          </div>

          {/* Expand toggle for extra info */}
          {hasExtended && (
            <>
              <button
                onClick={() => setExpanded((v) => !v)}
                className="flex items-center justify-center gap-2 w-full py-1.5 border-2 border-black bg-gray-100 hover:bg-gray-200 font-black text-xs uppercase tracking-wide transition-colors"
              >
                {expanded ? (
                  <><ChevronUp className="w-4 h-4" strokeWidth={3} />Hide Details</>
                ) : (
                  <><ChevronDown className="w-4 h-4" strokeWidth={3} />View Full Profile</>
                )}
              </button>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    key="extended"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-3 bg-gray-50 border-2 border-black p-3 rounded-md">
                      {member.bio && (
                        <div>
                          <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-1">Bio</p>
                          <p className="text-sm text-gray-700 font-medium leading-snug">{member.bio}</p>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-2">
                        <Chip icon={Phone} value={member.phone} />
                        <Chip icon={Calendar} value={member.year} />
                        <Chip
                          icon={Twitter}
                          value={member.twitter}
                          href={member.twitter?.startsWith("http") ? member.twitter : member.twitter ? `https://twitter.com/${member.twitter}` : undefined}
                        />
                      </div>
                      {member.skills && member.skills.length > 0 && (
                        <div>
                          <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Skills</p>
                          <div className="flex flex-wrap gap-1.5">
                            {member.skills.map((skill) => (
                              <span key={skill} className="px-2 py-0.5 bg-cyan-100 border-2 border-black text-xs font-black uppercase">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

          {/* Approve button */}
          <motion.button
            onClick={() => onApprove(member.id)}
            disabled={isApproving}
            whileTap={{ scale: 0.97 }}
            className="w-full h-12 bg-cyan-400 border-4 border-black font-black text-sm uppercase tracking-wide
                       hover:bg-cyan-300 transition-all duration-150 shadow-[4px_4px_0_0_#000]
                       active:shadow-none active:translate-x-1 active:translate-y-1
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-3"
          >
            {isApproving ? (
              <><Loader2 className="w-5 h-5 animate-spin" strokeWidth={3} /><span>Processing...</span></>
            ) : (
              <><span>Approve Member</span><Verified className="w-5 h-5" strokeWidth={2.5} /></>
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

        {/* Bottom accent corner */}
        <motion.div
          className={`absolute -bottom-2 -right-2 w-10 h-10 border-4 border-black rounded-md ${accentColor}`}
          whileHover={{ scale: 1.3, rotate: 20 }}
        />
      </motion.div>
    </motion.div>
  );
};
