import { useState } from "react";
import { HelpCircle, Plus, X } from "lucide-react";
import { EmptyState } from "../EmptyState";
import { Header } from "../Header";
import { LoadingSpinner } from "../LoadingSpinner";
import { SearchBar } from "../SearchBar";
import { ActionButton } from "../ActionButton";
import { QuestionForm } from "./QuestionForm";
import { QuestionCard } from "./QuestionCard";
import { useQuesiton } from "../../../hooks/useQuestions";
import { globalToast } from "../../../utils/toast";


interface QuestionsViewProps {
  selectedTopic: Topic;
  onBack: () => void;
}

const initialQuestionFormState: QuestionForm = {
  questionName: '',
  difficulty: 'Easy',
  link: '',
};

export const QuestionsView = ({ selectedTopic, onBack }: QuestionsViewProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [showNewQuestionForm, setShowNewQuestionForm] = useState(false);
  
  // This state will hold form data for both new and editing questions
  const [questionForm, setQuestionForm] = useState<QuestionForm>(initialQuestionFormState);

  const { questions, isLoading, deleteCurrentQuestion } = useQuesiton(selectedTopic.id);

  const handleEditClick = (question: Question) => {
    setEditingQuestionId(question.id);
    setQuestionForm(question); // Load question data into the form
    setShowNewQuestionForm(false); // Ensure the 'new question' form is hidden
  };

  const handleCancelEdit = () => {
    setEditingQuestionId(null);
    setQuestionForm(initialQuestionFormState); // Reset form
  };
  
  const handleToggleNewQuestionForm = () => {
    setShowNewQuestionForm(!showNewQuestionForm);
    setEditingQuestionId(null); // Ensure no question is being edited
    setQuestionForm(initialQuestionFormState); // Reset form for the new entry
  };

  const filteredQuestions = questions?.filter(question =>
    question.questionName.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6">
      <Header 
        title={`${selectedTopic.title.toUpperCase()}`} 
        subtitle="QUESTION_MANAGEMENT"
        onBack={onBack}
      />
      
      <SearchBar
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm}
        placeholder="SEARCH_QUESTIONS..."
      />

      <div className="flex justify-end mb-6">
        <ActionButton onClick={handleToggleNewQuestionForm}>
          <div className="flex items-center gap-2">
            {showNewQuestionForm ? <X className="w-5 h-5"/> : <Plus className="w-5 h-5" />}
            <span>{showNewQuestionForm ? 'CANCEL' : 'NEW_QUESTION'}</span>
          </div>
        </ActionButton>
      </div>

      {/* RENDER "ADD NEW" FORM */}
      {showNewQuestionForm && (
        <QuestionForm
          questionForm={questionForm}
          setQuestionForm={setQuestionForm}
          onCancel={handleToggleNewQuestionForm}
          onSuccess={() => setShowNewQuestionForm(false)} // Hide form on successful submission
          isEditing={false}
          selectedTopicId={selectedTopic.id}
        />
      )}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid gap-4">
          {filteredQuestions.map((question, index) => (
            editingQuestionId === question.id ? (
              <QuestionForm
                key={question.id}
                questionForm={questionForm}
                setQuestionForm={setQuestionForm}
                onCancel={handleCancelEdit}
                onSuccess={handleCancelEdit}
                isEditing={true}
                selectedTopicId={selectedTopic.id}
              />
            ) : (
              <QuestionCard
                key={question.id}
                index={index}
                question={question}
                onEdit={() => handleEditClick(question)}
                onDelete={() => deleteCurrentQuestion.mutate(question.id,{
                  onSuccess : ()=>{
                    globalToast.warning("Question Deleted Successfully");
                  }
                })}
              />
            )
          ))}

          {filteredQuestions.length === 0 && !isLoading && (
            <EmptyState icon={HelpCircle} message="NO_QUESTIONS_FOUND" />
          )}
        </div>
      )}
    </div>
  );
};