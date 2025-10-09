import { useState } from 'react';
import Login from '../Components/auth/LoginView';
import { GeometricBackground } from '../Components/auth/GeometricBackground';
import { DefaultView } from '../Components/auth/DefaultView';

export default function Authentication() {
  const [showLogin, setShowLogin] = useState(false);
  const [currentView, setCurrentView] = useState<'default' | 'login'>('default');



  return (
    <div className="min-h-screen bg-white p-4 md:p-8 relative overflow-hidden">
      <GeometricBackground/>
      
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
