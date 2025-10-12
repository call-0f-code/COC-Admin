import { useRef, useState } from 'react';
import { useProjects } from '../../hooks/useProjects';
import { globalToast } from '../../utils/toast';

interface ProjectFormProps {
  projectForm: projectForm;
  setProjectForm: React.Dispatch<React.SetStateAction<projectForm>>;
  onSuccess: () => void;
  isEditing?: boolean;
  editingProjectId?: string | null;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  projectForm,
  setProjectForm,
  onSuccess,
  isEditing = false,
  editingProjectId,
}) => {
  const { createNewProject, updatecurrentProject } = useProjects();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [image, setFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        globalToast.error('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        globalToast.error('Image size must be less than 5MB');
        return;
      }
      setFile(file);
      // setProjectForm({ ...projectForm, image: file });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setProjectForm({
      name: '',
      githubUrl: '',
      deployUrl: '',
    });
    setFile(null)
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    globalToast.success('Form Reset');
  };

  const onSave = () => {
    if (!projectForm?.name?.trim()) {
      globalToast.error('Project name is required');
      return;
    }

    if (!isEditing && !image) {
      globalToast.error('Project image is required');
      return;
    }

    const mutation = isEditing ? updatecurrentProject : createNewProject;
    const msg = isEditing
      ? 'Project Updated Successfully'
      : 'Project Created Successfully';

    if (isEditing && editingProjectId) {
      updatecurrentProject.mutate(
        { projectForm: projectForm, image: image, editingProjectId },
        {
          onSuccess: () => {
            globalToast.success(msg);
            onSuccess();
          },
          onError: (error) => {
            globalToast.error(`Failed to update project`);
            console.error(error);
          },
        }
      );
    } else {
      createNewProject.mutate(
        { projectForm: projectForm, image: image },
        {
          onSuccess: () => {
            globalToast.success(msg);
            onSuccess();
          },
          onError: (error) => {
            globalToast.error(`Failed to create project`);
            console.error(error);
          },
        }
      );
    }
  };

  return (
    <div className="bg-black border-8 border-cyan-400 p-8 shadow-[8px_8px_0px_0px_#00FFFF]">
      <div className="space-y-6">
        {/* Project Name */}
        <div>
          <label className="block text-lg font-extrabold text-white mb-2 tracking-wider">
            PROJECT_NAME
          </label>
          <input
            type="text"
            value={projectForm.name}
            onChange={(e) =>
              setProjectForm({ ...projectForm, name: e.target.value })
            }
            placeholder="ENTER_PROJECT_NAME..."
            className="w-full p-4 bg-white border-4 border-black text-black font-bold text-lg placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-cyan-400 transition"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-lg font-extrabold text-white mb-2 tracking-wider">
            PROJECT_IMAGE
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <div className="space-y-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-cyan-700 hover:bg-cyan-600 text-white font-black uppercase tracking-wider px-6 py-3 border-4 border-black shadow-[4px_4px_0_#000] transition-transform hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              {projectForm.image ? 'CHANGE_IMAGE' : 'UPLOAD_IMAGE'}
            </button>

            {imagePreview && (
              <div className="relative border-4 border-black p-4 bg-white">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover border-4 border-black"
                />
                <div className="mt-2 text-sm font-black text-black uppercase tracking-wider">
                  {projectForm.image?.name}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Git URL */}
        <div>
          <label className="block text-lg font-extrabold text-white mb-2 tracking-wider">
            GIT_URL
          </label>
          <input
            type="url"
            value={projectForm.githubUrl}
            onChange={(e) =>
              setProjectForm({ ...projectForm, githubUrl: e.target.value })
            }
            placeholder="https://github.com/username/repo"
            className="w-full p-4 bg-white border-4 border-black text-black font-bold text-lg placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-cyan-400 transition"
          />
        </div>

        {/* Deployed URL */}
        <div>
          <label className="block text-lg font-extrabold text-white mb-2 tracking-wider">
            DEPLOYED_URL
          </label>
          <input
            type="url"
            value={projectForm.deployUrl}
            onChange={(e) =>
              setProjectForm({ ...projectForm, deployUrl: e.target.value })
            }
            placeholder="https://your-project.com"
            className="w-full p-4 bg-white border-4 border-black text-black font-bold text-lg placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-cyan-400 transition"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={onSave}
            disabled={
              createNewProject.isPending ||
              updatecurrentProject.isPending ||
              !projectForm.name.trim()
            }
            className="bg-cyan-700 hover:bg-cyan-600 text-white font-black uppercase tracking-wider px-6 py-3 border-4 border-black shadow-[4px_4px_0_#000] transition-transform hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            {isEditing ? 'UPDATE_PROJECT' : 'CREATE_PROJECT'}
          </button>

          <button
            onClick={handleReset}
            className="bg-white text-black font-black uppercase tracking-wider px-6 py-3 border-4 border-black shadow-[4px_4px_0_#00FFFF] hover:bg-gray-100 transition-transform hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
};
