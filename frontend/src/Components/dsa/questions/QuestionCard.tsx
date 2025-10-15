import { motion } from "framer-motion";
import { Edit3, Trash2, ExternalLink } from "lucide-react";

const getDifficultyColor = (difficulty: Question["difficulty"]) => {
  switch (difficulty) {
    case "Easy":
      return "bg-green-400 text-black border-black";
    case "Medium":
      return "bg-yellow-400 text-black border-black";
    case "Hard":
      return "bg-red-400 text-black border-black";
    default:
      return "bg-gray-400 text-black border-black";
  }
};

const getDifficultySymbol = (difficulty: Question["difficulty"]) => {
  switch (difficulty) {
    case "Easy":
      return "◆";
    case "Medium":
      return "◆◆";
    case "Hard":
      return "◆◆◆";
    default:
      return "◆";
  }
};

interface QuestionCardProps {
  question: Question;
  index: number;
  onEdit: (question: Question) => void;
  onDelete: (questionId: string) => void;
}

export const QuestionCard = ({
  question,
  index,
  onEdit,
  onDelete,
}: QuestionCardProps) => (
  <motion.div
    initial={{ y: 40, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    whileHover={{ y: -4, rotate: -1 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="relative mb-10"
  >
    {/* stacked ticket shadows */}
    <div className="absolute inset-0 translate-x-2 translate-y-2 bg-cyan-300 border-4 border-black -z-10"></div>
    <div className="absolute inset-0 translate-x-4 translate-y-4 bg-black border-4 border-black -z-20"></div>

    {/* main ticket */}
    <div className="relative bg-white border-4 border-black shadow-[6px_6px_0_0_#00FFFF] rounded-none overflow-hidden">
      {/* perforated edge */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-[repeating-linear-gradient(90deg,white_0,white_10px,black_10px,black_12px)]" />

      {/* dotted cut marks on sides */}
      <div className="absolute top-4 left-0 h-[calc(100%-2rem)] w-2 flex flex-col justify-between items-center">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-1 h-1 bg-black rounded-full opacity-70"></div>
        ))}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            {/* Question Number */}
            <div className="flex-shrink-0 w-14 h-14 bg-black border-4 border-black flex items-center justify-center shadow-[3px_3px_0_0_#00FFFF]">
              <span className="text-white font-black text-lg">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Question Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <h4 className="text-lg font-black text-black tracking-wide uppercase break-words">
                  {question.questionName}
                </h4>

                <span
                  className={`inline-flex items-center px-3 py-1 text-xs font-black border-4 shadow-[2px_2px_0_0_#000] ${getDifficultyColor(
                    question.difficulty
                  )}`}
                >
                  <span className="mr-2 text-base">
                    {getDifficultySymbol(question.difficulty)}
                  </span>
                  {question.difficulty.toUpperCase()}
                </span>
              </div>

              {question.link && (
                <a
                  href={question.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white border-4 border-black px-3 py-2 text-black font-bold text-sm shadow-[2px_2px_0_0_#000] hover:-translate-y-[2px] hover:shadow-[1px_1px_0_0_#000] transition-all duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>OPEN_PROBLEM.SH</span>
                </a>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 ml-4">
            <motion.button
              whileTap={{ scale: 0.9, rotate: -3 }}
              onClick={() => onEdit(question)}
              className="w-12 h-12 bg-cyan-400 border-4 border-black flex items-center justify-center shadow-[3px_3px_0_0_#000] hover:-translate-y-1 transition"
              title="EDIT QUESTION"
            >
              <Edit3 className="w-5 h-5 text-black" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9, rotate: 3 }}
              onClick={() => onDelete(question.id)}
              className="w-12 h-12 bg-red-400 border-4 border-black flex items-center justify-center shadow-[3px_3px_0_0_#000] hover:-translate-y-1 transition"
              title="DELETE QUESTION"
            >
              <Trash2 className="w-5 h-5 text-black" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);
