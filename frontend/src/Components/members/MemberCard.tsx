import { Loader2, Verified} from "lucide-react";

interface memberCardProps {
  member: Member;
  onApprove: (memberId: string) => void;
  isApproving: boolean;
}


export const MemberCard : React.FC<memberCardProps> = ({ member, onApprove, isApproving}) => {
  
  return (
  <div className="flex mb-8 px-4 px+4">
  <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0_0_#00FFFF]">
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-2xl font-black text-black mb-2 tracking-tight">
          {member.name}
        </h3>
        {isApproving ? (
            <div className="w-10 h-10 bg-cyan-400 border-2 border-black flex items-center justify-center hover:bg-cyan-300 transition-colors">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          ) : (
            <p className="text-lg font-bold text-grey-700 mb-4">
            {member.email}
            </p>
          )}
      </div>

      <div>    
        <button
          onClick={() => onApprove(member.id)}
          className="w-40 h-10 bg-cyan-400 border-2 border-black flex items-center justify-center hover:bg-cyan-300 transition-colors ml-4 mt-3"
          title="Approve Member"
        >
          <div className="text-lg font-bold text-grey-700 m-2">Approve</div>
          <Verified className="w-5 h-5 text-black" />
        </button>
      </div>
    </div>
    </div>
  </div>
)};