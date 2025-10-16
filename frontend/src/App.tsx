import { Toaster } from 'react-hot-toast';
import './App.css';
import Authentication from './pages/Authentication';
import DsaDashboard from './pages/DsaDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProjectDashboard from './pages/ProjectDashboard';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboardlayout from './Components/Dashboard/Dashboardlayout';

function App() {
  return (<>

   <Routes>
        <Route path='/' element={ <Authentication/> }/>

        <Route path="/Dashboard" element={<Dashboardlayout/>} >
                  <Route index element={<Navigate to="members" />} />
                  <Route path="projects" element={<ProjectDashboard/>} />
                  <Route path="members" element={<AdminDashboard/>} />
                  <Route path="dsa" element={<DsaDashboard/>} />
          </Route>
   </Routes>

  <Toaster position="top-center" reverseOrder={false} />
  </>
)

}

export default App;
