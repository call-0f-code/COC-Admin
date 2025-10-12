import { Save, X, Upload, UserPlus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useAchievement } from "../../hooks/useAchievement";


interface AchievementFormProps {
  achievementForm: {
    title: string;
    description: string;
    achievedAt: string;
    imageUrl: string;
    members: string[];
  };
  setAchievementForm: React.Dispatch<React.SetStateAction<any>>;
  onCancel: () => void;
  isEditing: boolean;
  editingAchievementId: string | null;
  availableMembers: Member[];
  isPending: boolean;
}

export const AchievementForm: React.FC<AchievementFormProps> = ({
  achievementForm,
  setAchievementForm,
  onCancel,
  isEditing = false,
  editingAchievementId,
  availableMembers = [],
  isPending
}) => {
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [imagePreview, setImagePreview] = useState(achievementForm.imageUrl || "");

  const {updateAchievement,createAchievement} = useAchievement()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setAchievementForm({ ...achievementForm, imageUrl: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMember = () => {
    if (selectedMemberId && !achievementForm.members.includes(selectedMemberId)) {
      setAchievementForm({
        ...achievementForm,
        members: [...achievementForm.members, selectedMemberId]
      });
      setSelectedMemberId("");
    }
  };

  const handleRemoveMember = (memberId: string) => {
    setAchievementForm({
      ...achievementForm,
      members: achievementForm.members.filter((id: string) => id !== memberId)
    });
  };

  const getSelectedMembers = () => {
    return availableMembers.filter(m => achievementForm.members.includes(m.id));
  };

  const handleCreate = (data:any) =>{
    const mutation = createAchievement;
    const formattedData = {
      ...data,
      achievedAt: new Date(data.achievedAt).toISOString()
    };

    mutation.mutate(formattedData, {
      onSuccess: () => {
        onCancel();
      }
    });
  }

  const handleSubmit = () => {
    if (!achievementForm.title.trim()) return;
    
    const data = {
      ...achievementForm,
      id: editingAchievementId
    };
    if(isEditing){
      //handleUpdate(data);
    }else{
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
            onChange={(e) => setAchievementForm({ ...achievementForm, title: e.target.value })}
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
            onChange={(e) => setAchievementForm({ ...achievementForm, description: e.target.value })}
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
            onChange={(e) => setAchievementForm({ ...achievementForm, achievedAt: e.target.value })}
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
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
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
                .filter(m => !achievementForm.members.includes(m.id))
                .map(member => (
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
              <div className="text-white font-bold text-sm tracking-wider">SELECTED_MEMBERS:</div>
              {getSelectedMembers().map(member => (
                <div key={member.id} className="flex items-center justify-between bg-white border-2 border-black p-3">
                  <div className="flex items-center gap-3">
                    {member.profilePhoto ? (
                      <img src={member.profilePhoto} alt={member.name} className="w-8 h-8 rounded-full border-2 border-black" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-black" />
                    )}
                    <div>
                      <div className="font-bold text-black">{member.name}</div>
                      <div className="text-sm text-gray-600">{member.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    className="p-2 bg-red-400 border-2 border-black hover:bg-red-300 transition-colors"
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
            disabled={isPending || !achievementForm.title.trim()}
            className="flex-1 bg-cyan-400 border-4 border-black p-4 font-black text-lg hover:bg-cyan-300 transition-colors shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] active:shadow-[2px_2px_0_0_#000] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-center gap-2">
              <Save className="w-5 h-5" />
              <span>{isEditing ? 'UPDATE_ACHIEVEMENT' : 'CREATE_ACHIEVEMENT'}</span>
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
}