import { Loader2, Mail, User, RotateCcw, Skull } from "lucide-react";
import { motion } from "framer-motion";

interface DeadZoneCardProps {
  member: Member;
  onUnghost: () => void;
  isUnghosting: boolean;
}

export const DeadZoneCard: React.FC<DeadZoneCardProps> = ({
  member,
  onUnghost,
  isUnghosting,
}) => {
  return (
    <motion.div
      className="w-full max-w-lg perspective-400"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        whileHover={{ rotateX: 5, rotateY: -5, scale: 1.05 }}
        className="relative bg-white border-4 border-black shadow-[6px_6px_0_0_#000000] rounded-xl overflow-visible transition-all duration-300"
      >
        {/* Top accent bar — red for danger/dead zone */}
        <div className="absolute top-0 left-0 w-full h-2 bg-red-500" />

        {/* Ghosted badge */}
        <div className="absolute top-3 right-4 flex items-center gap-1 bg-red-500 border-2 border-black px-2 py-0.5 rounded-sm z-20">
          <Skull className="w-3 h-3 text-white" strokeWidth={2.5} />
          <span className="text-xs font-black text-white uppercase tracking-widest">
            Ghosted
          </span>
        </div>

        <div className="relative p-8 flex flex-col gap-6 z-10 mt-2">
          {/* Header */}
          <motion.div
            className="relative flex items-center gap-4"
            whileHover={{ x: 2, y: -2 }}
          >
            <motion.div
              className="w-16 h-16 bg-red-100 border-4 border-black flex items-center justify-center rounded-md relative"
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <User className="w-8 h-8 text-black" strokeWidth={3} />
              {/* Mini floating skull */}
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 border-2 border-black rounded-full flex items-center justify-center"
                animate={{ y: [-2, 2] }}
                transition={{ repeat: Infinity, duration: 1.5, repeatType: "mirror" }}
              />
            </motion.div>
            <h3 className="text-2xl font-black text-black tracking-tight uppercase leading-tight z-20">
              {member.name}
            </h3>
          </motion.div>

          {/* Email */}
          <motion.div
            className="relative flex items-center gap-2 bg-red-50 border-2 border-black p-3 rounded-md overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            <Mail className="w-5 h-5 text-black flex-shrink-0" strokeWidth={2.5} />
            <p className="text-base font-bold text-gray-700 truncate">{member.email}</p>

            {/* Red glow outline */}
            <motion.div
              className="absolute inset-0 border-2 border-red-500 rounded-md pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.5 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Unghost button */}
          <button
            onClick={onUnghost}
            disabled={isUnghosting}
            className="w-full h-14 bg-red-500 border-4 border-black font-black text-lg uppercase tracking-wide text-white
                       hover:bg-red-400 active:shadow-none active:translate-x-1 active:translate-y-1
                       transition-all duration-150 shadow-[4px_4px_0_0_#000000]
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-500
                       flex items-center justify-center gap-3"
          >
            {isUnghosting ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" strokeWidth={3} />
                <span>Restoring...</span>
              </>
            ) : (
              <>
                <span>Restore Member</span>
                <RotateCcw className="w-6 h-6" strokeWidth={2.5} />
              </>
            )}
          </button>
        </div>

        {/* Bottom accent floating panel — red */}
        <motion.div
          className="absolute -bottom-2 -right-2 w-10 h-10 bg-red-500 border-4 border-black rounded-md"
          whileHover={{ scale: 1.3, rotate: 20 }}
        />
      </motion.div>
    </motion.div>
  );
};
