import { Edit3, HelpCircle, Loader2, Trash2 } from "lucide-react";

interface topicCardProps {
  topic : topicData;
  onViewQuestions : (topic: topicData) => void;
  onEdit :  (topic?: topicData | null) => void;
  onDelete :  (topicId: string) => void;
  isDeleting : boolean;
}


export const TopicCard : React.FC<topicCardProps> = ({ topic, onViewQuestions, onEdit,onDelete,isDeleting }) => {


  return (
  <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0_0_#00FFFF]">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <h3 className="text-2xl font-black text-black mb-2 tracking-tight">
          {topic.title}
        </h3>
        {isDeleting ? (
            <div className="flex items-center gap-2 text-lg font-bold text-red-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Deleting...</span>
            </div>
          ) : (
            <p className="text-lg font-bold text-gray-700 mb-4">
              {topic.description}
            </p>
          )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onViewQuestions(topic)}
          className="w-10 h-10 bg-cyan-400 border-2 border-black flex items-center justify-center hover:bg-cyan-300 transition-colors"
          title="View Questions"
        >
          <HelpCircle className="w-5 h-5 text-black" />
        </button>
        <button
          onClick={() => onEdit(topic)}
          className="w-10 h-10 bg-yellow-400 border-2 border-black flex items-center justify-center hover:bg-yellow-300 transition-colors"
          title="Edit Topic"
        >
          <Edit3 className="w-5 h-5 text-black" />
        </button>
        <button
          onClick={() => onDelete(topic.id)}
          className="w-10 h-10 bg-red-400 border-2 border-black flex items-center justify-center hover:bg-red-300 transition-colors"
          title="Delete Topic"
        >
          <Trash2 className="w-5 h-5 text-black" />
        </button>
      </div>
    </div>
  </div>
)};