import { useState } from 'react';
import { ActionButton } from '../common/ActionButton';
import { EmptyState } from '../common/EmptyState';
import { Header } from '../common/Header';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { SearchBar } from '../common/SearchBar';
import { useProjects } from '../../hooks/useProjects';
import { ProjectCard } from './ProjectCard';
import { FileText, Plus, X } from 'lucide-react';
import { ProjectForm } from './ProjectForm';
import { globalToast } from '../../utils/toast';

// Type placeholders
interface ProjectData {
  id?: string;
  name: string;
  githubUrl: string;
  deployUrl: string;
}

const ProjectView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectForm, setProjectForm] = useState<ProjectData>({
    name: '',
    githubUrl: '',
    deployUrl: '',
  });

  const { projects, isLoading, deletecurrentProject } = useProjects();

  // Handle edit click
  const handleEditClick = (project: ProjectData) => {
    setProjectForm({
      name: project.name,
      githubUrl: project.githubUrl,
      deployUrl: project.deployUrl,
    });
    setEditingProjectId(project.id || null);
    setShowProjectForm(true);
  };

  // Cancel both new and edit mode
  const handleCancel = () => {
    setShowProjectForm(false);
    setEditingProjectId(null);
    setProjectForm({
      name: '',
      githubUrl: '',
      deployUrl: '',
    });
  };

  // Toggle create new project form
  const handleToggleNewProjectForm = () => {
    if (showProjectForm && !editingProjectId) {
      handleCancel();
    } else {
      setEditingProjectId(null);
      setProjectForm({
        name: '',
        githubUrl: '',
        deployUrl: '',
      });
      setShowProjectForm(!showProjectForm);
    }
  };

  // Filter projects
  const filteredProjects = projects.filter((project: ProjectData) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Header title="COC.ADMIN" subtitle="Project_Management" onBack={undefined} />

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="SEARCH_PROJECTS..."
      />

      <div className="flex justify-end mb-6">
        <ActionButton onClick={handleToggleNewProjectForm}>
          <div className="flex items-center gap-2">
            {showProjectForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            <span>
              {showProjectForm
                ? editingProjectId
                  ? 'CANCEL_EDIT'
                  : 'CANCEL'
                : 'NEW_PROJECT'}
            </span>
          </div>
        </ActionButton>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : showProjectForm ? (
        <ProjectForm
          projectForm={projectForm}
          setProjectForm={setProjectForm}
          onSuccess={handleCancel}
          isEditing={!!editingProjectId}
          editingProjectId={editingProjectId}
        />
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {filteredProjects.map((project: ProjectData) => (
            <div key={project.id}>
              <ProjectCard
                project={project}
                onDelete={() =>
                  deletecurrentProject.mutate(project.id, {
                    onSuccess: () => {
                      globalToast.warning('Project Deleted Successfully');
                    },
                  })
                }
                onEdit={() => handleEditClick(project)}
              />
            </div>
          ))}

          {filteredProjects.length === 0 && !isLoading && (
            <EmptyState icon={FileText} message="NO_PROJECTS_FOUND" />
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectView;
