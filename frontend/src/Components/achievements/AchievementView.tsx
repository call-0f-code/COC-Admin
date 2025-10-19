import { Trophy, Plus, X } from 'lucide-react';
import { Header } from '../common/Header';
import { SearchBar } from '../common/SearchBar';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { AchievementCard } from './AchievementCard';
import { AchievementForm } from './AchievementForm';
import { EmptyState } from '../common/EmptyState';
import { useState } from 'react';
import { useAchievement } from '../../hooks/useAchievement';
import { useMembers } from '../../hooks/useMembers';

export const AchievementsView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingAchievementId, setEditingAchievementId] = useState<
    string | null
  >(null);
  const [showNewAchievementForm, setShowNewAchievementForm] = useState(false);
  const [achievementForm, setAchievementForm] = useState({
    title: '',
    description: '',
    achievedAt: new Date().toISOString().split('T')[0],
    imageUrl: '',
    members: [] as string[],
  });

  const { achievements, isLoading, deleteAchievement } = useAchievement();

  const { getAllmembers } = useMembers();

  const handleEditClick = (achievement: AchievementDb) => {
    setEditingAchievementId(achievement.id);
    setAchievementForm({
      title: achievement.title,
      description: achievement.description,
      achievedAt: new Date(achievement.achievedAt).toISOString().split('T')[0],
      imageUrl: achievement.imageUrl,
      members: achievement.members?.map((m) => m.member.id) || [],
    });
    setShowNewAchievementForm(false);
  };

  const handleCancel = () => {
    setEditingAchievementId(null);
    setShowNewAchievementForm(false);
    setAchievementForm({
      title: '',
      description: '',
      achievedAt: new Date().toISOString().split('T')[0],
      imageUrl: '',
      members: [],
    });
  };

  const handleToggleNewAchievementForm = () => {
    if (!showNewAchievementForm) {
      setEditingAchievementId(null);
      setAchievementForm({
        title: '',
        description: '',
        achievedAt: new Date().toISOString().split('T')[0],
        imageUrl: '',
        members: [],
      });
    }
    setShowNewAchievementForm(!showNewAchievementForm);
  };

  const filteredAchievements =
    achievements.filter(
      (achievement: Achievement) =>
        achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        achievement.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="space-y-6">
      <Header
        title="COC.ADMIN"
        subtitle="ACHIEVEMENT_MANAGEMENT"
        onBack={undefined}
      />

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="SEARCH_ACHIEVEMENTS..."
      />

      <div className="flex justify-end mb-6">
        <button
          onClick={handleToggleNewAchievementForm}
          className="bg-cyan-400 border-4 border-black px-6 py-3 font-black text-lg hover:bg-cyan-300 transition-colors shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] active:shadow-[2px_2px_0_0_#000]"
        >
          <div className="flex items-center gap-2">
            {showNewAchievementForm ? (
              <X className="w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
            <span>{showNewAchievementForm ? 'CANCEL' : 'NEW_ACHIEVEMENT'}</span>
          </div>
        </button>
      </div>

      {showNewAchievementForm && (
        <AchievementForm
          achievementForm={achievementForm}
          setAchievementForm={setAchievementForm}
          onCancel={handleCancel}
          isEditing={false}
          editingAchievementId={editingAchievementId}
          availableMembers={getAllmembers}
        />
      )}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid gap-4">
          {filteredAchievements.map((achievement: AchievementDb) => {
            const isDeleting =
              deleteAchievement.isPending &&
              deleteAchievement.variables === achievement.id;

            return editingAchievementId === achievement.id ? (
              <AchievementForm
                key={achievement.id}
                achievementForm={achievementForm}
                setAchievementForm={setAchievementForm}
                onCancel={handleCancel}
                isEditing={true}
                editingAchievementId={editingAchievementId}
                availableMembers={getAllmembers}
              />
            ) : (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                onEdit={handleEditClick}
                onDelete={(id) => deleteAchievement.mutate(id)}
                isDeleting={isDeleting}
              />
            );
          })}

          {filteredAchievements.length === 0 && !isLoading && (
            <EmptyState icon={Trophy} message="NO_ACHIEVEMENTS_FOUND" />
          )}
        </div>
      )}
    </div>
  );
};
