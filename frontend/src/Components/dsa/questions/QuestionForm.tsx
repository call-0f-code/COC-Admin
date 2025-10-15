import { motion } from "framer-motion";
import { Save, X, Code2, Link as LinkIcon, AlertCircle } from "lucide-react";
import { useQuesiton } from "../../../hooks/useQuestions";
import React from "react";
import { ActionButton } from "../../common/ActionButton";
import { globalToast } from "../../../utils/toast";

interface QuestionFormProps {
  questionForm: QuestionForm;
  setQuestionForm: React.Dispatch<React.SetStateAction<QuestionForm>>;
  onCancel: () => void;
  onSuccess: () => void;
  isEditing?: boolean;
  selectedTopicId: string;
  EditingQuestionId: string | null;
}

export const QuestionForm = ({
  questionForm,
  setQuestionForm,
  onCancel,
  onSuccess,
  isEditing = false,
  selectedTopicId,
  EditingQuestionId
}: QuestionFormProps) => {
  const { updateCurrentQuestion, createNewQuestion } = useQuesiton(selectedTopicId);


  const handleCreate = () =>{
    const question:QuestionForm = {...questionForm}
    const mutation = createNewQuestion;
    mutation.mutate(question, {
      onSuccess: () => {
        globalToast.success("Question Created Successfully");
        onSuccess();
      },
    });
  }

  const handleUpdate = () =>{
    if(!EditingQuestionId){
      globalToast.error("Invalid Question")
      return
    }
    const question : Question = {...questionForm,id:EditingQuestionId}
    const mutation = updateCurrentQuestion;
    mutation.mutate(question, {
      onSuccess: () =>{
        globalToast.success("Question Updated Successfully");
        onSuccess()
      }
    })
  }

  const handleSave = () => {
    if(isEditing){
      handleUpdate()
    }else{
      handleCreate()
    }
    
  };


  const isLoading =
    createNewQuestion.isPending || updateCurrentQuestion.isPending;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="relative max-w-4xl mx-auto"
    >
      {/* angled cyan layer */}
      <div className="absolute -top-3 -left-3 w-full h-full bg-cyan-400 border-4 border-black rotate-1 translate-y-1 -z-10"></div>

      <div className="bg-white border-4 border-black shadow-[10px_10px_0_0_#000] overflow-hidden">
        {/* Title Ribbon */}
        <div className="relative bg-black text-white p-6 border-b-4 border-black">
          <div className="absolute top-0 right-0 w-16 h-full bg-cyan-400 border-l-4 border-black skew-x-[15deg]" />
          <div className="flex items-center gap-3">
            <Code2 className="w-8 h-8 text-cyan-400" />
            <div>
              <h2 className="text-2xl sm:text-3xl font-black">
                {isEditing ? "EDIT QUESTION" : "ADD NEW QUESTION"}
              </h2>
              <p className="text-gray-300 font-bold text-sm tracking-wide">
                {isEditing ? "Update problem details below" : "Create your next DSA challenge"}
              </p>
            </div>
          </div>
        </div>

        {/* FORM BODY */}
        <div className="p-10 space-y-10">
          {/* Field Group */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Question Name */}
            <motion.div
              whileHover={{ y: -2 }}
              className="border-4 border-black bg-white shadow-[5px_5px_0_0_#00FFFF] p-5"
            >
              <label className="flex items-center gap-2 text-lg font-black mb-3">
                <Code2 className="w-5 h-5 text-cyan-500" /> QUESTION NAME
              </label>
              <input
                type="text"
                value={questionForm.questionName}
                onChange={(e) =>
                  setQuestionForm({ ...questionForm, questionName: e.target.value })
                }
                placeholder="e.g. Reverse Linked List"
                className="w-full p-3 border-4 border-black bg-white font-bold text-black placeholder-gray-500 focus:outline-none focus:shadow-[4px_4px_0_0_#00FFFF] transition-all"
              />
            </motion.div>

            {/* Difficulty */}
            <motion.div
              whileHover={{ y: -2 }}
              className="border-4 border-black bg-white shadow-[5px_5px_0_0_#00FFFF] p-5"
            >
              <label className="flex items-center gap-2 text-lg font-black mb-3">
                <AlertCircle className="w-5 h-5 text-cyan-500" /> DIFFICULTY
              </label>
              <select
                value={questionForm.difficulty}
                onChange={(e) =>
                  setQuestionForm({
                    ...questionForm,
                    difficulty: e.target.value as QuestionForm["difficulty"],
                  })
                }
                className="w-full p-3 border-4 border-black bg-white font-bold text-black focus:outline-none focus:shadow-[4px_4px_0_0_#00FFFF] transition cursor-pointer"
              >
                <option value="Easy">EASY</option>
                <option value="Medium">MEDIUM</option>
                <option value="Hard">HARD</option>
              </select>
            </motion.div>
          </div>

          {/* Problem Link */}
          <motion.div
            whileHover={{ y: -2 }}
            className="border-4 border-black bg-white shadow-[5px_5px_0_0_#00FFFF] p-5"
          >
            <label className="flex items-center gap-2 text-lg font-black mb-3">
              <LinkIcon className="w-5 h-5 text-cyan-500" /> PROBLEM LINK
            </label>
            <input
              type="url"
              value={questionForm.link}
              onChange={(e) =>
                setQuestionForm({ ...questionForm, link: e.target.value })
              }
              placeholder="https://leetcode.com/problems/two-sum/"
              className="w-full p-3 border-4 border-black bg-white font-bold text-black placeholder-gray-500 focus:outline-none focus:shadow-[4px_4px_0_0_#00FFFF] transition"
            />
          </motion.div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 border-t-4 border-black p-8 bg-white">
          <ActionButton
            onClick={handleSave}
            disabled={isLoading || !questionForm.questionName.trim()}
          >
            <div className="flex items-center justify-center gap-3">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-[2px] border-black border-t-transparent animate-spin"></div>
                  <span>SAVING...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>{isEditing ? "./UPDATE.SH" : "./SAVE.SH"}</span>
                </>
              )}
            </div>
          </ActionButton>

          <ActionButton onClick={onCancel} variant="secondary">
            <div className="flex items-center justify-center gap-3">
              <X className="w-5 h-5" />
              <span>./CANCEL.SH</span>
            </div>
          </ActionButton>
        </div>
      </div>
    </motion.div>
  );
};
