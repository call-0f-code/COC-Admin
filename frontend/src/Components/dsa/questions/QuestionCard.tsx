import { Edit3, Trash2, ExternalLink } from "lucide-react";

const getDifficultyColor = (difficulty: Question['difficulty']) => {
  switch (difficulty) {
    case 'Easy': return 'bg-green-400 text-black border-black';
    case 'Medium': return 'bg-yellow-400 text-black border-black';
    case 'Hard': return 'bg-red-400 text-black border-black';
    default: return 'bg-gray-400 text-black border-black';
  }
};

const getDifficultySymbol = (difficulty: Question['difficulty']) => {
  switch (difficulty) {
    case 'Easy': return '◆';
    case 'Medium': return '◆◆';
    case 'Hard': return '◆◆◆';
    default: return '◆';
  }
};

interface QuestionCardProps {
  question: Question;
  index: number;
  onEdit: (question: Question) => void;
  onDelete: (questionId: string) => void;
}

export const QuestionCard = ({ question, index, onEdit, onDelete }: QuestionCardProps) => (
  <div className="relative mb-6">
    <div className="relative z-10 bg-white border-4 border-black shadow-[6px_6px_0_0_#00FFFF]">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            {/* Question Number */}
            <div className="flex-shrink-0 w-12 h-12 bg-black border-4 border-black flex items-center justify-center shadow-[3px_3px_0_0_#00FFFF]">
              <span className="text-white font-black text-lg">{String(index + 1).padStart(2, '0')}</span>
            </div>
            
            {/* Question Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <h4 className="text-lg font-black text-black tracking-wide truncate uppercase">
                  {question.questionName}
                </h4>
                
                <span className={`inline-flex items-center px-3 py-1 text-xs font-black border-3 shadow-[2px_2px_0_0_#000] ${getDifficultyColor(question.difficulty)}`}>
                  <span className="mr-2 text-base">{getDifficultySymbol(question.difficulty)}</span>
                  {question.difficulty.toUpperCase()}
                </span>
              </div>
              
              {question.link && (
                <a 
                  href={question.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white border-2 border-black px-3 py-2 text-black font-bold text-sm shadow-[2px_2px_0_0_#000] hover:shadow-[1px_1px_0_0_#000] hover:translate-x-1 hover:translate-y-1 transition-all duration-150"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>./OPEN_PROBLEM.SH</span>
                </a>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 ml-4">
            <button
              onClick={() => onEdit(question)}
              className="w-12 h-12 bg-cyan-400 border-3 border-black flex items-center justify-center shadow-[3px_3px_0_0_#000] hover:shadow-[1px_1px_0_0_#000] hover:translate-x-1 hover:translate-y-1 transition-all duration-150"
              title="EDIT QUESTION"
            >
              <Edit3 className="w-5 h-5 text-black" />
            </button>
            <button
              onClick={() => onDelete(question.id)}
              className="w-12 h-12 bg-red-400 border-3 border-black flex items-center justify-center shadow-[3px_3px_0_0_#000] hover:shadow-[1px_1px_0_0_#000] hover:translate-x-1 hover:translate-y-1 transition-all duration-150"
              title="DELETE QUESTION"
            >
              <Trash2 className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);