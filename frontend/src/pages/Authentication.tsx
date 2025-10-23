import { useState } from 'react';
import Login from '../Components/auth/LoginView';
import { DefaultView } from '../Components/auth/DefaultView';

export default function Authentication() {
  const [currentView, setCurrentView] = useState<'default' | 'login'>('default');



  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      
      {currentView === 'default' && (
          <DefaultView
            onLogin={() => setCurrentView('login')}
          />
        )}
        
        {currentView === 'login'  && (
          <Login
            onBack={() => setCurrentView('default')}
          />
      )}
    </div>
  );
}
