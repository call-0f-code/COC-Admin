import { Edit3, Calendar, Loader2, Trash2, Users } from 'lucide-react';

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
  isDeleting,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const members = achievement.members || [];

  return (
<div
  className="relative bg-white border-4 border-black p-5 rounded-xl w-[90%] max-w-5xl mx-auto 
  shadow-[6px_6px_0_#00FFFF] 
  transition-all duration-300 ease-out 
  overflow-hidden group 
  hover:-translate-y-2 hover:rotate-[1deg] hover:shadow-[10px_10px_0_#00FFFF]"
>
  {/* Animated glowing ring */}
  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-100 to-white 
      rounded-xl opacity-0 blur-sm group-hover:opacity-70 animate-gradient-move pointer-events-none" />

  {/* Floating bounce animation on hover */}
  <div className="absolute inset-0 rounded-xl scale-100 group-hover:scale-[1.02] group-hover:translate-y-[-3px] transition-transform duration-500" />

  {/* Card Content */}
  <div className="relative z-10 flex flex-col md:flex-row gap-5">
        {/* Left Image Section */}
        {achievement.imageUrl && (
          <div className="relative w-full md:w-48 h-48 border-4 border-black overflow-hidden rounded-lg shadow-[4px_4px_0_#000] bg-gradient-to-br from-cyan-200 to-yellow-200">
            <img
              src={`${achievement.imageUrl}?t=${Date.now()}`}
              alt={achievement.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute bottom-0 left-0 bg-black/70 text-yellow-300 font-black px-3 py-1 text-xs uppercase tracking-wide">
              Achievement
            </div>
          </div>
        )}

        {/* Right Content Section */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Title and Controls */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-2xl font-black text-black uppercase tracking-tight relative">
              <span className="px-2  border-b-4 border-black">
                {achievement.title}
              </span>
            </h3>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(achievement)}
                disabled={isDeleting}
                className="bg-yellow-400 border-4 border-black p-2 rounded-lg hover:bg-yellow-300 shadow-[3px_3px_0_#000] hover:shadow-[5px_5px_0_#000] transition-all active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50"
                title="Edit"
              >
                <Edit3 className="w-5 h-5 text-black" />
              </button>
              <button
                onClick={() => onDelete(achievement.id)}
                disabled={isDeleting}
                className="bg-red-400 border-4 border-black p-2 rounded-lg hover:bg-red-300 shadow-[3px_3px_0_#000] hover:shadow-[5px_5px_0_#000] transition-all active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50"
                title="Delete"
              >
                <Trash2 className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>

          {/* Description */}
          {isDeleting ? (
            <div className="flex items-center gap-2 text-red-600 font-bold text-lg bg-red-100 border-2 border-black px-3 py-2 w-fit">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>DELETING...</span>
            </div>
          ) : (
            <p className="text-gray-800 font-semibold leading-relaxed mb-4">
              {achievement.description}
            </p>
          )}

          {/* Date */}
          <div className="flex items-center gap-2 w-fit bg-yellow-300 border-2 border-black px-3 py-1 shadow-[2px_2px_0_#000] font-bold text-sm uppercase">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(achievement.achievedAt)}</span>
          </div>

          {/* Members */}
          {members.length > 0 && (
            <div className="mt-5">
              <div className="flex items-center gap-2 mb-2 bg-cyan-400 border-2 border-black px-3 py-1 font-black text-sm tracking-wide uppercase w-fit shadow-[3px_3px_0_#000]">
                <Users className="w-4 h-4" />
                Squad ({members.length})
              </div>
              <div className="flex flex-wrap gap-2">
                {members.map(({ member }) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-2 bg-white border-2 border-black px-3 py-1 shadow-[2px_2px_0_#00FFFF] hover:shadow-[3px_3px_0_#00FFFF] hover:-translate-y-0.5 transition-all"
                    title={member.email}
                  >
                    {member.profilePhoto ? (
                      <img
                        src={member.profilePhoto}
                        alt={member.name}
                        className="w-7 h-7 border-2 border-black rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-7 h-7 bg-gradient-to-br from-yellow-400 to-cyan-400 border-2 border-black rounded-full" />
                    )}
                    <span className="font-black text-sm text-black uppercase">
                      {member.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
