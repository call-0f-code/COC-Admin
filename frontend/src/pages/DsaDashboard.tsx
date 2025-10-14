import  { useState } from 'react';
import { GeometricBackground } from '../components/dsa/GeometricBackground';
import { TopicsView } from '../components/dsa/topics/TopicsView';
import { QuestionsView } from '../components/dsa/questions/QuestionsView';


export default function DsaDashboard() {
  const [currentView, setCurrentView] = useState<'topics' | 'questions'>('topics');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const openTopicQuestions = (topic: Topic) => {
    setSelectedTopic(topic);
    setCurrentView('questions');
    
  };

  const handleBackToTopics = () => {
    setCurrentView('topics');
    setSelectedTopic(null);
  };


  return (
    <div className="min-h-screen bg-white p-4 md:p-8 relative overflow-hidden">
      <GeometricBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {currentView === 'topics' && (
          <TopicsView
            onViewQuestions={openTopicQuestions}
          />
        )}
        
        {currentView === 'questions' && selectedTopic && (
          <QuestionsView
            selectedTopic={selectedTopic}
            onBack={handleBackToTopics}
          />
        )}
        
      </div>
    </div>
  );
}