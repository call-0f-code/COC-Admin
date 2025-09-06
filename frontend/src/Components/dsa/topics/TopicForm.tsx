import { Save, X } from "lucide-react";
import { ActionButton } from "../ActionButton";
import { useTopics } from "../../../hooks/useTopics";

interface topicFormProps {
  topicForm : topicData;
  setTopicForm: React.Dispatch<React.SetStateAction<topicData>>;
  onCancel : () => void;
  isEditing : boolean
}

export const TopicForm :React.FC<topicFormProps> = ({ 
  topicForm, 
  setTopicForm,  
  onCancel, 
  isEditing = false 
}) => {
  const {createNewTopic,updateCurrentTopic} = useTopics();
  const onSave = async () => {
    if(!topicForm?.title) return;
    if (!topicForm?.title.trim()) return;
    
    if(isEditing){
      updateCurrentTopic.mutate(topicForm);
    }else{

      createNewTopic.mutate(topicForm);
    }
    
  };

  return (
  <div className="bg-black border-4 border-black p-8 shadow-[12px_12px_0_0_#00FFFF]">
    <div className="space-y-6">
      <div>
        <label className="block text-lg font-black text-white mb-2 tracking-wider">
          TOPIC_NAME
        </label>
        <input
          type="text"
          value={topicForm.title}
          onChange={(e) => setTopicForm({ ...topicForm, title: e.target.value })}
          placeholder="ENTER_TOPIC_NAME..."
          className="w-full p-4 bg-white border-4 border-black text-black font-bold text-lg placeholder-gray-500 focus:outline-none focus:shadow-[4px_4px_0_0_#00FFFF] transition-shadow"
        />
      </div>

      <div>
        <label className="block text-lg font-black text-white mb-2 tracking-wider">
          DESCRIPTION
        </label>
        <textarea
          value={topicForm.description}
          onChange={(e) => setTopicForm({ ...topicForm, description: e.target.value })}
          placeholder="ENTER_DESCRIPTION..."
          className="w-full p-4 bg-white border-4 border-black text-black font-bold text-base placeholder-gray-500 focus:outline-none focus:shadow-[4px_4px_0_0_#00FFFF] transition-shadow resize-none"
          rows={4}
        />
      </div>

      <div className="flex gap-4">
        <ActionButton
          onClick={onSave}
          disabled={createNewTopic.isPending || !topicForm.title.trim() || updateCurrentTopic.isPending}
        >
          <div className="flex items-center gap-2">
            <Save className="w-5 h-5" />
            <span>{isEditing ? 'UPDATE_TOPIC' : 'CREATE_TOPIC'}</span>
          </div>
        </ActionButton>
        
        <ActionButton variant="secondary" onClick={onCancel}>
          <div className="flex items-center gap-2">
            <X className="w-5 h-5" />
            <span>CANCEL</span>
          </div>
        </ActionButton>
      </div>
    </div>
  </div>
)};
