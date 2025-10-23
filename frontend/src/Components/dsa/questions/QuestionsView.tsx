import { useState } from "react";
import { HelpCircle, Plus, X } from "lucide-react";
import { EmptyState } from "../../common/EmptyState";
import { Header } from "../../common/Header";
import { LoadingSpinner } from "../../common/LoadingSpinner";
import { SearchBar } from "../../common/SearchBar";
import { ActionButton } from "../../common/ActionButton";
import { QuestionForm } from "./QuestionForm";
import { QuestionCard } from "./QuestionCard";
import { useQuesiton } from "../../../hooks/useQuestions";
import { globalToast } from "../../../utils/toast";

interface QuestionsViewProps {
  selectedTopic: Topic;
  onBack: () => void;
}

const initialQuestionFormState: QuestionForm = {
  questionName: "",
  difficulty: "Easy",
  link: "",
};

export const QuestionsView = ({ selectedTopic, onBack }: QuestionsViewProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [showNewQuestionForm, setShowNewQuestionForm] = useState(false);
  const [questionForm, setQuestionForm] = useState<QuestionForm>(initialQuestionFormState);

  const { questions, isLoading, deleteCurrentQuestion } = useQuesiton(selectedTopic.id);

  const handleEditClick = (question: Question) => {
    setEditingQuestionId(question.id);
    setQuestionForm(question);
    setShowNewQuestionForm(false);
  };

  const handleCancelEdit = () => {
    setEditingQuestionId(null);
    setQuestionForm(initialQuestionFormState);
  };

  const handleToggleNewQuestionForm = () => {
    setShowNewQuestionForm(!showNewQuestionForm);
    setEditingQuestionId(null);
    setQuestionForm(initialQuestionFormState);
  };

  const filteredQuestions =
    questions?.filter((question: Question) =>
      question.questionName.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="relative overflow-hidden pt-[120px] space-y-6">
      {/* Fixed header */}
      <Header
        title={`${selectedTopic.title.toUpperCase()}`}
        subtitle="QUESTION_MANAGEMENT"
        onBack={onBack}
      />

      {/* Search bar */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="SEARCH_QUESTIONS..."
      />

      {/* New question button */}
      <div className="flex justify-end mb-6 px-8 md:px-12">
        <ActionButton onClick={handleToggleNewQuestionForm}>
          <div className="flex items-center gap-2">
            {showNewQuestionForm ? (
              <X className="w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
            <span>{showNewQuestionForm ? "CANCEL" : "NEW_QUESTION"}</span>
          </div>
        </ActionButton>
      </div>

      {/* Add new question form */}
      {showNewQuestionForm && (
        <div className="px-6 md:px-12">
          <QuestionForm
            questionForm={questionForm}
            setQuestionForm={setQuestionForm}
            onCancel={handleToggleNewQuestionForm}
            onSuccess={() => setShowNewQuestionForm(false)}
            isEditing={false}
            selectedTopicId={selectedTopic.id}
            EditingQuestionId={editingQuestionId}
          />
        </div>
      )}

      {/* Questions list */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid gap-6 px-6 md:px-12 pb-12">
          {filteredQuestions.map((question: Question, index: number) =>
            editingQuestionId === question.id ? (
              <QuestionForm
                key={question.id}
                questionForm={questionForm}
                setQuestionForm={setQuestionForm}
                onCancel={handleCancelEdit}
                onSuccess={handleCancelEdit}
                isEditing={true}
                selectedTopicId={selectedTopic.id}
                EditingQuestionId={editingQuestionId}
              />
            ) : (
              <QuestionCard
                key={question.id}
                index={index}
                question={question}
                onEdit={() => handleEditClick(question)}
                onDelete={() =>
                  deleteCurrentQuestion.mutate(question.id, {
                    onSuccess: () => {
                      globalToast.warning("Question Deleted Successfully");
                    },
                  })
                }
              />
            )
          )}

          {filteredQuestions.length === 0 && !isLoading && (
            <EmptyState icon={HelpCircle} message="NO_QUESTIONS_FOUND" />
          )}
        </div>
      )}
    </div>
  );
};
