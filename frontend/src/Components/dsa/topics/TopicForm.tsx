import { motion } from "framer-motion";
import { Save, X, PenTool } from "lucide-react";
import { ActionButton } from "../../common/ActionButton";
import { useTopics } from "../../../hooks/useTopics";
import { globalToast } from "../../../utils/toast";

interface topicFormProps {
  topicForm: TopicForm;
  setTopicForm: React.Dispatch<React.SetStateAction<TopicForm>>;
  onCancel: () => void;
  onSuccess: () => void;
  isEditing: boolean;
  editingTopicId: string | null;
}

export const TopicForm: React.FC<topicFormProps> = ({
  topicForm,
  setTopicForm,
  onCancel,
  onSuccess,
  isEditing = false,
  editingTopicId,
}) => {
  const { createNewTopic, updateCurrentTopic } = useTopics();

  const onSave = () => {
    if (!topicForm?.title?.trim()) return;
    const topic: any = topicForm;
    const mutation = isEditing ? updateCurrentTopic : createNewTopic;
    if (isEditing) topic.id = editingTopicId;

    mutation.mutate(topic, {
      onSuccess: () => {
        globalToast.success(isEditing ? "Topic Updated Successfully" : "Topic Created Successfully");
        onSuccess();
      },
    });
  };

  const isLoading = createNewTopic.isPending || updateCurrentTopic.isPending;

  const progress =
    Math.min(
      ((topicForm.title.length + topicForm.description.length) / 200) * 100,
      100
    ) + "%";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="relative border-4 border-black bg-white shadow-[10px_10px_0_0_#00FFFF] overflow-hidden"
    >
      {/* animated top accent bar */}
      <motion.div
        className="absolute top-0 left-0 h-2 bg-cyan-400"
        animate={{ width: progress }}
        transition={{ ease: "easeOut", duration: 0.4 }}
      />

      <div className="grid md:grid-cols-2 gap-10 p-10 items-start">
        {/* LEFT: title + label */}
        <div className="space-y-6 relative">
          <motion.div
            whileHover={{ y: -3 }}
            className="bg-white border-4 border-black shadow-[5px_5px_0_0_#000] p-6"
          >
            <label className="block text-lg font-black text-black mb-2 uppercase">
              Topic Name
            </label>
            <input
              type="text"
              value={topicForm.title}
              onChange={(e) =>
                setTopicForm({ ...topicForm, title: e.target.value })
              }
              placeholder="Enter topic name..."
              className="w-full p-3 bg-white border-4 border-black text-black font-bold placeholder-gray-500 focus:outline-none focus:shadow-[4px_4px_0_0_#00FFFF] transition-all"
            />
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="bg-black text-white border-4 border-black p-6 shadow-[5px_5px_0_0_#00FFFF]"
          >
            <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
              <PenTool className="w-5 h-5 text-cyan-400" /> 
              {isEditing ? "Edit Mode Active" : "Creation Mode"}
            </h3>
            <p className="text-sm text-gray-300 mt-1">
              {isEditing
                ? "You can modify this topic's details below."
                : "Fill in the fields to create a new topic."}
            </p>
          </motion.div>
        </div>

        {/* RIGHT: description box */}
        <motion.div
          whileHover={{ y: -3 }}
          className="border-4 border-black bg-white shadow-[5px_5px_0_0_#000] p-6 relative"
        >
          <label className="block text-lg font-black text-black mb-3 uppercase">
            Description
          </label>
          <textarea
            value={topicForm.description}
            onChange={(e) =>
              setTopicForm({ ...topicForm, description: e.target.value })
            }
            placeholder="Enter detailed description..."
            className="w-full p-4 bg-white border-4 border-black text-black font-bold text-base placeholder-gray-500 focus:outline-none focus:shadow-[4px_4px_0_0_#00FFFF] transition-all resize-none"
            rows={6}
          />

          {/* subtle cyan triangle accent */}
          <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[60px] border-t-[60px] border-l-transparent border-t-cyan-400" />
        </motion.div>
      </div>

      {/* Buttons Row */}
      <div className="flex justify-end gap-4 px-10 pb-10 mt-4 border-t-4 border-black pt-6 bg-white">
        <ActionButton
          onClick={onSave}
          disabled={isLoading || !topicForm.title.trim()}
          className="min-w-[160px]"
        >
          <div className="flex items-center justify-center gap-2">
            <Save className="w-5 h-5" />
            <span>{isEditing ? "Update Topic" : "Create Topic"}</span>
          </div>
        </ActionButton>

        <ActionButton
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          <div className="flex items-center gap-2">
            <X className="w-5 h-5" />
            <span>Cancel</span>
          </div>
        </ActionButton>
      </div>
    </motion.div>
  );
};
