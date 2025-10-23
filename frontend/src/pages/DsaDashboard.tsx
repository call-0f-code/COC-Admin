import  { useState } from 'react';
import { TopicsView } from '../Components/dsa/topics/TopicsView';
import { QuestionsView } from '../Components/dsa/questions/QuestionsView';


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
    <div className="min-h-screen  relative overflow-hidden">
      
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