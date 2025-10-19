import { Edit3, Calendar, Loader2, Trash2, Users } from "lucide-react";


interface AchievementCardProps {
  achievement: AchievementDb;
  onEdit: (achievement: AchievementDb) => void;
  onDelete: (achievementId: string) => void;
  isDeleting: boolean;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ 
  achievement,
  onEdit,
  onDelete,
  isDeleting
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const members = achievement.members || [];

  return (
    <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0_0_#00FFFF]">
      <div className="flex gap-6">
        {/* Achievement Image */}
        {achievement.imageUrl && (
          <div className="flex-shrink-0 w-48 h-48 border-4 border-black overflow-hidden">
            <img 
              src={`${achievement.imageUrl}?t=${Date.now()}`} 
              alt={achievement.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        <div className="flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-2xl font-black text-black mb-2 tracking-tight">
                {achievement.title}
              </h3>
              
              {isDeleting ? (
                <div className="flex items-center gap-2 text-lg font-bold text-red-600">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>DELETING...</span>
                </div>
              ) : (
                <>
                  <p className="text-base font-bold text-gray-700 mb-3">
                    {achievement.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>ACHIEVED: {formatDate(achievement.achievedAt)}</span>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(achievement)}
                disabled={isDeleting}
                className="w-10 h-10 bg-yellow-400 border-2 border-black flex items-center justify-center hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Edit Achievement"
              >
                <Edit3 className="w-5 h-5 text-black" />
              </button>
              <button
                onClick={() => onDelete(achievement.id)}
                disabled={isDeleting}
                className="w-10 h-10 bg-red-400 border-2 border-black flex items-center justify-center hover:bg-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Delete Achievement"
              >
                <Trash2 className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>

          {/* Members Section */}
          {members.length > 0 && (
            <div className="mt-auto">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-black" />
                <span className="font-black text-sm tracking-wider">TEAM_MEMBERS ({members.length})</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {members.map(({ member }) => (
                  <div 
                    key={member.id} 
                    className="flex items-center gap-2 bg-cyan-100 border-2 border-black px-3 py-2"
                    title={member.email}
                  >
                    {member.profilePhoto ? (
                      <img 
                        src={member.profilePhoto} 
                        alt={member.name}
                        className="w-6 h-6 rounded-full border-2 border-black object-cover"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-black" />
                    )}
                    <span className="font-bold text-sm text-black">{member.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}