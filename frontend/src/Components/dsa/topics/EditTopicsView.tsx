import { Header } from "../Header";
import { TopicForm } from "./TopicForm";

interface editTopicProps {
  selectedTopic : topicData | null;
  topicForm : topicData;
  setTopicForm : React.Dispatch<React.SetStateAction<topicData>>;
  onBack : () => void;

}

export const EditTopicView : React.FC<editTopicProps> = ({ 
  selectedTopic, 
  topicForm, 
  setTopicForm, 
  onBack,
}) => (
  <div className="space-y-6">
    <Header 
      title={selectedTopic ? 'EDIT_TOPIC' : 'CREATE_TOPIC'} 
      subtitle="TOPIC_FORM"
      onBack={onBack}
    />

    <TopicForm
      topicForm={topicForm}
      setTopicForm={setTopicForm}
      onCancel={onBack}
      isEditing={!!selectedTopic}
    />
  </div>
);