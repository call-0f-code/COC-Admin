import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { Code2, Edit3, HelpCircle, Trash2 } from "lucide-react";

interface topicCardProps {
  topic: Topic;
  onViewQuestions: (topic: Topic) => void;
  onEdit: (topic: Topic) => void;
  onDelete: (topicId: string) => void;
  isDeleting: boolean;
}

export const TopicCard = ({ topic, onViewQuestions, onEdit, onDelete }:topicCardProps) => {
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY }}
      className="relative bg-white border-4 border-black p-8 rounded-xl shadow-[8px_8px_0_0_#000]
                 transition-all duration-300 hover:bg-cyan-200"
    >
      {/* Floating cyan layer */}
      <motion.div
        animate={{ x: hovered ? 8 : 0, y: hovered ? 8 : 0 }}
        className="absolute top-2 left-2 w-full h-full bg-white -z-10 border-4 border-black"
      />

      <div className="flex items-start gap-6">
        <div className="w-16 h-16 bg-black border-4 border-black flex items-center justify-center shadow-[3px_3px_0_0_#00FFFF]">
          <Code2 className="w-8 h-8 text-cyan-400" />
        </div>
        <div className="flex-1 space-y-2">
          <h3 className="text-2xl font-black text-black">{topic.title}</h3>
          <p className="text-base font-semibold text-gray-700">{topic.description}</p>
        </div>
      </div>

      <motion.div
        className="mt-4 flex gap-3 justify-end"
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={() => onViewQuestions(topic)}
          className="px-3 py-2 bg-cyan-400 border-4 border-black shadow-[3px_3px_0_0_#000]"
        >
          <HelpCircle />
        </button>
        <button
          onClick={() => onEdit(topic)}
          className="px-3 py-2 bg-yellow-400 border-4 border-black shadow-[3px_3px_0_0_#000]"
        >
          <Edit3 />
        </button>
        <button
          onClick={() => onDelete(topic.id)}
          className="px-3 py-2 bg-red-400 border-4 border-black shadow-[3px_3px_0_0_#000]"
        >
          <Trash2 />
        </button>
      </motion.div>
    </motion.div>
  );
};
