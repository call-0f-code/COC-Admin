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
    (topic: Topic) =>
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative overflow-hidden pt-[80px] space-y-12">
      <Header title="" subtitle="TOPIC_MANAGEMENT" onBack={undefined} />

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="SEARCH_TOPICS"
      />

      <div className="flex justify-end">
        <ActionButton onClick={handleToggleNewTopicForm}>
          <div className="flex items-center gap-3">
            {showNewTopicForm ? (
              <>
                <X className="w-7 h-7" />
                <span className="text-xl">Close</span>
              </>
            ) : (
              <>
                <Plus className="w-7 h-7" />
                <span className="text-xl">New Topic</span>
              </>
            )}
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
          editingTopicId={editingTopicId}
        />
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-32">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="space-y-8">
          {filteredTopics.map((topic: Topic) => {
            const isDeleting =
              deleteCurrentTopic.isPending && deleteCurrentTopic.variables === topic.id;

            return editingTopicId === topic.id ? (
              <TopicForm
                key={topic.id}
                topicForm={topicForm}
                setTopicForm={setTopicForm}
                onCancel={handleCancel}
                onSuccess={handleCancel}
                isEditing={true}
                editingTopicId={editingTopicId}
              />
            ) : (
              <TopicCard
                key={topic.id}
                topic={topic}
                onViewQuestions={onViewQuestions}
                onEdit={handleEditClick}
                onDelete={() =>
                  deleteCurrentTopic.mutate(topic.id, {
                    onSuccess: () => {
                      globalToast.warning('Topic Deleted Successfully');
                    },
                  })
                }
                isDeleting={isDeleting}
              />
            );
          })}

          {filteredTopics.length === 0 && !isLoading && (
            <EmptyState icon={FileText} message="No topics found" />
          )}
        </div>
      )}

      {!isLoading && filteredTopics.length > 0 && (
        <div className="flex items-center justify-center py-12">
          <div className="bg-black px-8 py-4 border-4 border-cyan-400 shadow-[6px_6px_0_0_#000]">
            <span className="text-xl font-black text-white">
              {filteredTopics.length} Topic{filteredTopics.length !== 1 ? 's' : ''} Found
            </span>
          </div>
        </div>
      )}
    </div>
  );
};