import  { useState } from 'react';
import { GeometricBackground } from '../Components/dsa/GeometricBackground';
import { TopicsView } from '../Components/dsa/topics/TopicsView';
import { EditTopicView } from '../Components/dsa/topics/EditTopicsView';
import { QuestionsView } from '../Components/dsa/questions/QuestionsView';



export default function DsaDashboard() {
  const [currentView, setCurrentView] = useState('topics');
  const [selectedTopic, setSelectedTopic] = useState<topicData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [topicForm, setTopicForm] = useState<topicData>({ id: '', title: '', description: '' });


  const openEditTopic = (topic :topicData | null = null) => {
    setSelectedTopic(topic);
    if(topic){
      setTopicForm(topic);
    }else{
      setTopicForm({ id: '', title: '', description: '' });
    }
    setCurrentView('edit-topic');
  };

  const openTopicQuestions = (topic: topicData) => {
    setSelectedTopic(topic);
    setCurrentView('questions');
    setSearchTerm('');
  };

  const handleBackToTopics = () => {
    setCurrentView('topics');
    setSearchTerm('');
    setSelectedTopic(null);
  };


  return (
    <div className="min-h-screen bg-white p-4 md:p-8 relative overflow-hidden">
      <GeometricBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {currentView === 'topics' && (
          <TopicsView
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onCreateTopic={() => openEditTopic()}
            onEditTopic={openEditTopic}
            onViewQuestions={openTopicQuestions}
          />
        )}
        
        {currentView === 'questions' && selectedTopic && (
          <QuestionsView
            selectedTopic={selectedTopic}
            onBack={handleBackToTopics}
          />
        )}
        
        {currentView === 'edit-topic' && (
          <EditTopicView
            selectedTopic={selectedTopic}
            topicForm={topicForm}
            setTopicForm={setTopicForm}
            onBack={handleBackToTopics}
          />
        )}
      </div>
    </div>
  );
}