import { Toaster } from 'react-hot-toast';
import './App.css';
import Authentication from './pages/Authentication';
import DsaDashboard from './pages/DsaDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProjectDashboard from './pages/ProjectDashboard';
import AchievementPage from './pages/AchievementPage';

function App() {
  return (<>
  <Authentication/> 
   <ProjectDashboard/>
    <DsaDashboard/> 
   <AdminDashboard/>
   <AchievementPage/>
  <Toaster position="top-center" reverseOrder={false} />
  </>
)

}

export default App;
