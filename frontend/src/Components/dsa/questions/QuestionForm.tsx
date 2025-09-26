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
}

export const QuestionForm = ({ 
  questionForm, 
  setQuestionForm,  
  onCancel,  
  onSuccess,
  isEditing = false,
  selectedTopicId
}: QuestionFormProps) => {
  const { updateCurrentQuestion, createNewQuestion } = useQuesiton(selectedTopicId);
  
  const handleSave = () => {
    const mutation = isEditing ? updateCurrentQuestion : createNewQuestion;
    const msg = isEditing ? "Question Updated Successfully" : "Question Created Successfully";
    mutation.mutate(questionForm, {
      onSuccess: () => {
        globalToast.success(msg);
        onSuccess(); 
      },
     
    });
  };

  return (
    <div className="relative p-4 mb-8">
      <div className="relative z-10 bg-white border-[6px] border-black shadow-[12px_12px_0_0_#00FFFF]">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-black border-4 border-black flex items-center justify-center shadow-[4px_4px_0_0_#00FFFF]">
                    <Code2 className="w-8 h-8 text-white" />
                </div>
            </div>
            <h3 className="text-3xl font-black text-black mb-2 tracking-tight">
              {isEditing ? 'EDIT QUESTION' : 'ADD QUESTION'}
            </h3>
            <p className="text-lg font-bold text-gray-600 mb-3">
              {isEditing ? 'UPDATE DSA PROBLEM' : 'NEW DSA PROBLEM'}
            </p>
            <div className="w-full h-1 bg-cyan-400 border-2 border-black"></div>
          </div>
          
          <div className="space-y-8">
            {/* Question Name */}
            <div>
              <label className="block text-lg font-black text-black tracking-wider mb-3">
                QUESTION NAME
              </label>
              <div className="relative">
                <div className="absolute left-3 top-3 w-8 h-8 bg-cyan-400 border-2 border-black flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-black" />
                </div>
                <input
                  type="text"
                  value={questionForm.questionName}
                  onChange={(e) => setQuestionForm({ ...questionForm, questionName: e.target.value })}
                  placeholder="TWO SUM, BINARY TREE..."
                  className="w-full pl-14 pr-4 py-4 bg-white border-4 border-black text-black font-bold text-base placeholder-gray-500 focus:outline-none focus:shadow-[4px_4px_0_0_#00FFFF] transition-shadow"
                />
              </div>
            </div>
            
            {/* Difficulty Level */}
            <div>
              <label className="block text-lg font-black text-black tracking-wider mb-3">
                DIFFICULTY LEVEL
              </label>
              <div className="relative">
                <div className="absolute left-3 top-3 w-8 h-8 bg-cyan-400 border-2 border-black flex items-center justify-center z-10">
                  <AlertCircle className="w-4 h-4 text-black" />
                </div>
                <select
                  value={questionForm.difficulty}
                  onChange={(e) => setQuestionForm({ ...questionForm, difficulty: e.target.value as QuestionForm['difficulty'] })}
                  className="w-full pl-14 pr-12 py-4 bg-white border-4 border-black text-black font-bold text-base focus:outline-none focus:shadow-[4px_4px_0_0_#00FFFF] transition-shadow appearance-none cursor-pointer"
                >
                  <option value="Easy">EASY</option>
                  <option value="Medium">MEDIUM</option>
                  <option value="Hard">HARD</option>
                </select>
                <div className="absolute right-3 top-3 w-8 h-8 bg-black border-2 border-black flex items-center justify-center pointer-events-none">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Problem Link */}
            <div>
              <label className="block text-lg font-black text-black tracking-wider mb-3">
                PROBLEM LINK
              </label>
              <div className="relative">
                <div className="absolute left-3 top-3 w-8 h-8 bg-cyan-400 border-2 border-black flex items-center justify-center">
                  <LinkIcon className="w-4 h-4 text-black" />
                </div>
                <input
                  type="url"
                  value={questionForm.link}
                  onChange={(e) => setQuestionForm({ ...questionForm, link: e.target.value })}
                  placeholder="HTTPS://LEETCODE.COM/PROBLEMS/..."
                  className="w-full pl-14 pr-4 py-4 bg-white border-4 border-black text-black font-bold text-base placeholder-gray-500 focus:outline-none focus:shadow-[4px_4px_0_0_#00FFFF] transition-shadow"
                />
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-between flex-col sm:flex-row gap-4 pt-6">
              <ActionButton
                onClick={handleSave}
                disabled={createNewQuestion.isPending || updateCurrentQuestion.isPending || !questionForm.questionName.trim()}
                
              >
                <div className="flex items-center justify-center gap-3">
                  {(createNewQuestion.isPending || updateCurrentQuestion.isPending) ? (
                    <>
                      <div className="w-5 h-5 border-[2px] border-black border-t-transparent animate-spin"></div>
                      <span>SAVING...</span>
                    </>
                  ) : (
                    <>
                      <div className="w-6 h-6 bg-black flex items-center justify-center">
                        <Save className="w-4 h-4 text-white" />
                      </div>
                      <span>{isEditing ? './UPDATE.SH' : './SAVE.SH'}</span>
                    </>
                  )}
                </div>
              </ActionButton>
              
              <ActionButton
                onClick={onCancel}
                variant="secondary"
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="w-6 h-6 bg-black flex items-center justify-center">
                    <X className="w-4 h-4 text-white" />
                  </div>
                  <span>./CANCEL.SH</span>
                </div>
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};