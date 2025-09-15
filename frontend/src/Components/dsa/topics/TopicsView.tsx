import { FileText, Plus, X } from 'lucide-react';
import { ActionButton } from '../../common/ActionButton';
import { Header } from '../../common/Header';
import { SearchBar } from '../../common/SearchBar';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { TopicCard } from './TopicCard';
import { EmptyState } from '../../common/EmptyState';
import { useTopics } from '../../../hooks/useTopics';
import { useState } from 'react';
import { TopicForm } from './TopicForm';
import { globalToast } from '../../../utils/toast';

interface TopicsViewProps {
  onViewQuestions: (topic: Topic) => void;
}

export const TopicsView: React.FC<TopicsViewProps> = ({ onViewQuestions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTopicId, setEditingTopicId] = useState<string | null>(null);
  const [showNewTopicForm, setShowNewTopicForm] = useState(false);
  const [topicForm, setTopicForm] = useState<TopicForm>({
    title: '',
    description: '',
  });

  const { topics, isLoading, deleteCurrentTopic } = useTopics();

  const handleEditClick = (topic: Topic) => {
    setEditingTopicId(topic.id);
    setTopicForm(topic);
    setShowNewTopicForm(false);
  };

  const handleCancel = () => {
    setEditingTopicId(null);
    setShowNewTopicForm(false);
    setTopicForm({
      title: '',
      description: '',
    });
  };
  const handleToggleNewTopicForm = () => {
    if (!showNewTopicForm) {
        setEditingTopicId(null);
        setTopicForm({
      title: '',
      description: '',
    });
    }
    setShowNewTopicForm(!showNewTopicForm);
  };



  const filteredTopics = topics.filter(
    (topic:Topic) =>
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Header
        title="COC.ADMIN"
        subtitle="TOPIC_MANAGEMENT"
        onBack={undefined}
      />

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="SEARCH_TOPICS..."
      />

      <div className="flex justify-end mb-6">
        <ActionButton onClick={handleToggleNewTopicForm}>
          <div className="flex items-center gap-2">
            {showNewTopicForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            <span>{showNewTopicForm ? 'CANCEL' : 'NEW_TOPIC'}</span>
          </div>
        </ActionButton>
      </div>
        {showNewTopicForm && (
        <TopicForm
          topicForm={topicForm}
          setTopicForm={setTopicForm}
          onCancel={handleCancel}
          onSuccess={handleCancel}
          isEditing={false}
          editingTopicId = {editingTopicId}
          
        />
      )}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid gap-4 ">
          {filteredTopics.map((topic:Topic) => {
            const isDeleting = deleteCurrentTopic.isPending && deleteCurrentTopic.variables === topic.id;
            
            
            return editingTopicId === topic.id ? (
              <TopicForm
                key={topic.id}
                topicForm={topicForm}
                setTopicForm={setTopicForm}
                onCancel={handleCancel}
                onSuccess={handleCancel} 
                isEditing={true}
                editingTopicId = {editingTopicId}
               
              />
            ) : (
              <TopicCard
                key={topic.id}
                topic={topic}
                onViewQuestions={onViewQuestions}
                onEdit={handleEditClick}
                onDelete={() => deleteCurrentTopic.mutate(topic.id,{
                  onSuccess:()=>{
                    globalToast.warning("Topic Deleted Successfully");
                  }
                })}
                isDeleting={isDeleting}
              />
            );
          })}

          {filteredTopics.length === 0 && !isLoading && (
            <EmptyState icon={FileText} message="NO_TOPICS_FOUND" />
          )}
        </div>
      )}
    </div>
  );
};
