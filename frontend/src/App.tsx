import { Toaster } from 'react-hot-toast';
import './App.css';
import Authentication from './pages/Authentication';
import DsaDashboard from './pages/DsaDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { AchievementsView } from './Components/achievements/AchievementView';
import ProjectDashboard from './pages/ProjectDashboard';

function App() {
  return (<>
  <Authentication/> 
   <ProjectDashboard/>
    <DsaDashboard/> 
   <AdminDashboard/>
   <AchievementsView/>
  <Toaster position="top-center" reverseOrder={false} />
  </>
)

}

export default App;
