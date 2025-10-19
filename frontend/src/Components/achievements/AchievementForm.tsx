import { Save, X, Upload, UserPlus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAchievement } from '../../hooks/useAchievement';
import { globalToast } from '../../utils/toast';

interface AchievementFormProps {
  achievementForm: Achievement | Achievementform;
  setAchievementForm: React.Dispatch<React.SetStateAction<any>>;
  onCancel: () => void;
  isEditing: boolean;
  editingAchievementId: string | null;
  availableMembers: Member[];
}

export const AchievementForm: React.FC<AchievementFormProps> = ({
  achievementForm,
  setAchievementForm,
  onCancel,
  isEditing = false,
  editingAchievementId,
  availableMembers = [],
}) => {
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [imagePreview, setImagePreview] = useState(
    achievementForm.imageUrl || ''
  );
  const [image, setImage] = useState<File | null>(null);
  const [achievementMembers, setAchievementMembers] = useState<string[]>(
    achievementForm.members || []
  );
  const [originalMembers] = useState<string[]>(achievementForm.members || []);

  const { updateAchievement, createAchievement, removeMemberInAchievement } =
    useAchievement();

  useEffect(() => {
    setAchievementMembers(achievementForm.members || []);
  }, [achievementForm.members]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      globalToast.error('Please select a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      globalToast.error('Image size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      setImage(file);
    };
    reader.readAsDataURL(file);
  };

  const handleAddMember = () => {
    if (!selectedMemberId) return;

    setAchievementMembers((prev) => {
      if (prev.includes(selectedMemberId)) return prev;
      return [...prev, selectedMemberId];
    });

    setAchievementForm((prev: Achievement) => ({
      ...prev,
      members: [...prev.members, selectedMemberId],
    }));

    setSelectedMemberId('');
  };

  const handleRemoveMember = (memberId: string) => {
    // Check if member was in the original achievement (exists in DB)
    const memberExistsInDB = originalMembers.includes(memberId);

    if (isEditing && editingAchievementId && memberExistsInDB) {
      // Member exists in DB: call API to remove
      removeMemberInAchievement.mutate(
        { achievementId: editingAchievementId, memberId },
        {
          onSuccess: () => {
            globalToast.success('Member removed successfully');
            // Update local state after successful API call
            setAchievementMembers((prev) =>
              prev.filter((id) => id !== memberId)
            );
            setAchievementForm((prev: Achievement) => ({
              ...prev,
              members: prev.members.filter((id) => id !== memberId),
            }));
          },
          onError: () => {
            globalToast.error('Failed to remove member');
          },
        }
      );
    } else {
      // Member doesn't exist in DB or in create mode: just update local state
      setAchievementMembers((prev) => prev.filter((id) => id !== memberId));
      setAchievementForm((prev: Achievement) => ({
        ...prev,
        members: prev.members.filter((id) => id !== memberId),
      }));

      // Show success message for newly added members being removed
      if (isEditing && !memberExistsInDB) {
        globalToast.success('Member removed from list');
      }
    }
  };

  const getSelectedMembers = () => {
    return availableMembers.filter((m) => achievementMembers.includes(m.id));
  };

  const handleCreate = (data: any) => {
    if (!image) {
      globalToast.error('Please upload an image to create achievement');
      return;
    }

    const formData = new FormData();
    formData.append('achievementData', JSON.stringify(data));
    formData.append('image', image);

    createAchievement.mutate(formData, {
      onSuccess: () => {
        globalToast.success('Achievement created successfully');
        onCancel();
      },
      onError: () => {
        globalToast.error('Failed to create achievement');
      },
    });
  };

  const handleUpdate = (data: any) => {
    if (!editingAchievementId) {
      globalToast.error('Invalid achievement');
      return;
    }

    const formData = new FormData();
    formData.append('achievementData', JSON.stringify(data));
    if (image) {
      formData.append('image', image);
    }

    updateAchievement.mutate(
      { formdata: formData, achievementId: editingAchievementId },
      {
        onSuccess: () => {
          globalToast.success('Achievement updated successfully');

          onCancel();
        },
        onError: () => {
          globalToast.error('Failed to update achievement');
        },
      }
    );
  };

  const handleSubmit = () => {
    if (!achievementForm.title.trim()) {
      globalToast.error('Please enter an achievement title');
      return;
    }

    const data = {
      ...achievementForm,
      achievedAt: new Date(achievementForm.achievedAt).toISOString(),
      memberIds: achievementMembers,
    };

    if (isEditing) {
      handleUpdate(data);
    } else {
      handleCreate(data);
    }
  };

  return (
    <div className="bg-black border-4 border-black p-8 shadow-[12px_12px_0_0_#00FFFF]">
      <div className="space-y-6">
        <div>
          <label className="block text-lg font-black text-white mb-2 tracking-wider">
            ACHIEVEMENT_TITLE
          </label>
          <input
            type="text"
            value={achievementForm.title}
            onChange={(e) =>
              setAchievementForm({ ...achievementForm, title: e.target.value })
            }
            placeholder="ENTER_ACHIEVEMENT_TITLE..."
            className="w-full p-4 bg-white border-4 border-black text-black font-bold text-lg placeholder-gray-500 focus:outline-none focus:shadow-[4px_4px_0_0_#00FFFF] transition-shadow"
          />
        </div>

        <div>
          <label className="block text-lg font-black text-white mb-2 tracking-wider">
            DESCRIPTION
          </label>
          <textarea
            value={achievementForm.description}
            onChange={(e) =>
              setAchievementForm({
                ...achievementForm,
                description: e.target.value,
              })
            }
            placeholder="ENTER_DESCRIPTION..."
            className="w-full p-4 bg-white border-4 border-black text-black font-bold text-base placeholder-gray-500 focus:outline-none focus:shadow-[4px_4px_0_0_#00FFFF] transition-shadow resize-none"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-lg font-black text-white mb-2 tracking-wider">
            ACHIEVED_DATE
          </label>
          <input
            type="date"
            value={achievementForm.achievedAt}
            onChange={(e) =>
              setAchievementForm({
                ...achievementForm,
                achievedAt: e.target.value,
              })
            }
            className="w-full p-4 bg-white border-4 border-black text-black font-bold text-lg focus:outline-none focus:shadow-[4px_4px_0_0_#00FFFF] transition-shadow"
          />
        </div>

        <div>
          <label className="block text-lg font-black text-white mb-2 tracking-wider">
            ACHIEVEMENT_IMAGE
          </label>
          <div className="flex gap-4 items-start">
            <label className="flex-1 cursor-pointer">
              <div className="w-full p-4 bg-white border-4 border-black text-black font-bold text-lg hover:shadow-[4px_4px_0_0_#00FFFF] transition-shadow flex items-center justify-center gap-2">
                <Upload className="w-5 h-5" />
                <span>UPLOAD_IMAGE</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            {imagePreview && (
              <div className="w-32 h-32 border-4 border-white overflow-hidden">
                <img
                  src={
                    imagePreview === achievementForm.imageUrl
                      ? `${imagePreview}?t=${Date.now()}`
                      : imagePreview
                  }
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-lg font-black text-white mb-2 tracking-wider">
            ADD_MEMBERS
          </label>
          <div className="flex gap-2">
            <select
              value={selectedMemberId}
              onChange={(e) => setSelectedMemberId(e.target.value)}
              className="flex-1 p-4 bg-white border-4 border-black text-black font-bold text-lg focus:outline-none focus:shadow-[4px_4px_0_0_#00FFFF] transition-shadow"
            >
              <option value="">SELECT_MEMBER...</option>
              {availableMembers
                .filter((m) => !achievementMembers.includes(m.id))
                .map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name} ({member.email})
                  </option>
                ))}
            </select>
            <button
              onClick={handleAddMember}
              disabled={!selectedMemberId}
              className="px-6 bg-cyan-400 border-4 border-black font-black text-lg hover:bg-cyan-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <UserPlus className="w-5 h-5" />
            </button>
          </div>

          {getSelectedMembers().length > 0 && (
            <div className="mt-4 space-y-2">
              <div className="text-white font-bold text-sm tracking-wider">
                SELECTED_MEMBERS ({getSelectedMembers().length}):
              </div>
              {getSelectedMembers().map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between bg-white border-2 border-black p-3"
                >
                  <div className="flex items-center gap-3">
                    {member.profilePhoto ? (
                      <img
                        src={member.profilePhoto}
                        alt={member.name}
                        className="w-8 h-8 rounded-full border-2 border-black object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-black flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">
                          {member.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-black">{member.name}</div>
                      <div className="text-sm text-gray-600">
                        {member.email}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    disabled={removeMemberInAchievement.isPending}
                    className="p-2 bg-red-400 border-2 border-black hover:bg-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Remove member"
                  >
                    <Trash2 className="w-4 h-4 text-black" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            disabled={
              createAchievement.isPending ||
              updateAchievement.isPending ||
              !achievementForm.title.trim()
            }
            className="flex-1 bg-cyan-400 border-4 border-black p-4 font-black text-lg hover:bg-cyan-300 transition-colors shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] active:shadow-[2px_2px_0_0_#000] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-center gap-2">
              <Save className="w-5 h-5" />
              <span>
                {isEditing ? 'UPDATE_ACHIEVEMENT' : 'CREATE_ACHIEVEMENT'}
              </span>
            </div>
          </button>

          <button
            onClick={onCancel}
            className="flex-1 bg-red-400 border-4 border-black p-4 font-black text-lg hover:bg-red-300 transition-colors shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] active:shadow-[2px_2px_0_0_#000]"
          >
            <div className="flex items-center justify-center gap-2">
              <X className="w-5 h-5" />
              <span>CANCEL</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
