import { MembersView } from '../Components/members/MemberView';
import { GeometricBackground } from '../Components/members/GeometricBackground';


export default function AdminDashboard() {

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 relative overflow-hidden">
      <GeometricBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <MembersView/>
      </div>
    </div>
  );
}