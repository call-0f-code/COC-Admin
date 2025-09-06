import { FileText, Plus } from "lucide-react";
import { ActionButton } from "../ActionButton";
import { Header } from "../Header";
import { SearchBar } from "../SearchBar";
import { LoadingSpinner } from "../LoadingSpinner";
import { TopicCard } from "./TopicCard";
import { EmptyState } from "../EmptyState";
import { useTopics } from "../../../hooks/useTopics";

interface TopicsViewProps {
  searchTerm:string;
  onSearchChange : React.Dispatch<React.SetStateAction<string>>;
  onCreateTopic : (topic? :null)=>void;
  onEditTopic: (topic?: topicData | null) => void;
  onViewQuestions: (topic: topicData) => void;
}



export const TopicsView : React.FC<TopicsViewProps> = ({ 
  searchTerm, 
  onSearchChange, 
  onCreateTopic, 
  onEditTopic, 
  onViewQuestions,
}) => {

  const {topics,isLoading,deleteCurrentTopic} = useTopics();
  
  
  const onDelete = (topicId:string) =>{
    deleteCurrentTopic.mutate(topicId);
  }
  

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Header title="COC.ADMIN" subtitle="TOPIC_MANAGEMENT" onBack={undefined} />
      
      <SearchBar 
        searchTerm={searchTerm} 
        onSearchChange={onSearchChange}
        placeholder="SEARCH_TOPICS..."
      />

      <div className="flex justify-end mb-6">
        <ActionButton onClick={onCreateTopic}>
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span>NEW_TOPIC</span>
          </div>
        </ActionButton>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid gap-4">
          {filteredTopics.map((topic) => {
            const isDeleting = deleteCurrentTopic.isPending && deleteCurrentTopic.variables === topic.id;
            return (
            <TopicCard
              key={topic.id}
              topic={topic}
              onViewQuestions={onViewQuestions}
              onEdit={onEditTopic}
              onDelete={onDelete}
              isDeleting={isDeleting}
            />
          )})}

          {filteredTopics.length === 0 && !isLoading && (
            <EmptyState icon={FileText} message="NO_TOPICS_FOUND" />
          )}
        </div>
      )}
    </div>
  );
};