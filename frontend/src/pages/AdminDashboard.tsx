import { MembersView } from '../Components/members/MemberView';


export default function AdminDashboard() {

  return (
    <div className="min-h-screen relative overflow-hidden">
    
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <MembersView/>
      </div>
    </div>
  );
}