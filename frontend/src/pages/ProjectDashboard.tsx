import { GeometricBackground } from '../Components/members/GeometricBackground';
import ProjectView from '../Components/Project/ProjectView';


export default function ProjectDashboard() {

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 relative overflow-hidden">
      <GeometricBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <ProjectView/>
      </div>
    </div>
  );
}