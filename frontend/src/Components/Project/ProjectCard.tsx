import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Edit3,
  ExternalLink,
  Github,
  Plus,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import ProjectMcard from './ProjectMcard';
import { useMembers } from '../../hooks/useMembers';
import { useProjects } from '../../hooks/useProjects';
import { globalToast } from '../../utils/toast';

interface ProjectCardProps {
  project: project;
  onDelete: (projectId: string) => void;
  onEdit: (project: project) => void;
  isDeleting: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onDelete,
  onEdit,
  isDeleting,
}) => {
  const { getAllmembers } = useMembers();
  const { addMember, removeMember } = useProjects();
  const [addmember, setAddmember] = useState(false);
  const [isRemoveMember, setRemoveMember] = useState(true);

  const handleToggel = () => setAddmember(!addmember);
  const handleRemoveToggel = () => setRemoveMember(!isRemoveMember);

  const handleAddUser = async (id: string) => {
    const msg = 'Member added successfully';
    const projectMember = [id];
    addMember.mutate(
      { memberId: projectMember, projectId: project.id },
      {
        onSuccess: () => {
          globalToast.success(msg);
          setAddmember(false);
        },
        onError: (error) => {
          globalToast.error(`Failed to Add member into project`);
          console.error(error);
        },
      }
    );
  };

  const handleRemoveUser = async (id: string) => {
    const msg = 'Member removed successfully';
    removeMember.mutate(
      { memberId: id, projectId: project.id },
      {
        onSuccess: () => {
          globalToast.success(msg);
          setAddmember(false);
        },
        onError: (error) => {
          globalToast.error(`Failed to remove from project`);
          console.error(error);
        },
      }
    );
  };

  const displayMembers = project.members.slice(0, 4);
  const remainingCount = project.members.length - displayMembers.length;

  return (
    <motion.div
  className="relative group cursor-pointer"
  initial={{ y: 0 }}
  whileHover={{ y: -12 }}
>
  {/* Layered File Effect */}
  <motion.div
    className="absolute inset-0 rounded-xl bg-neutral-300 border-2 border-black"
    style={{ zIndex: 0, rotate: '-2deg' }}
  />
  <motion.div
    className="absolute inset-0 rounded-xl bg-neutral-200 border-2 border-black"
    style={{ zIndex: 1, rotate: '1deg', top: 6, left: 6 }}
  />

  {/* Main Card */}
  <motion.div
    className="relative bg-white border-4 border-black shadow-[12px_12px_0_0_rgba(0,0,0,1)] rounded-xl overflow-hidden"
    style={{ zIndex: 2 }}
    whileHover={{
      rotate: 0,
      scale: 1.04,
      transition: { type: 'spring', stiffness: 200 },
    }}
  >
    {/* Project Header */}
    <div className="relative h-64 overflow-hidden border-b-4 border-black bg-gradient-to-br from-yellow-100 to-amber-200">
      {project.imageUrl ? (
        <img
          src={project.imageUrl}
          alt={project.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      ) : (
        <div className="flex items-center justify-center h-full text-6xl font-black text-black opacity-30">
          {project.name.charAt(0).toUpperCase()}
        </div>
      )}

      {/* Title Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white px-6 py-3">
        <h3 className="text-2xl font-bold tracking-tight">{project.name}</h3>
      </div>
    </div>

    {/* Card Body */}
    <div className="p-6 space-y-5">
      {/* Links */}
      <div className="flex flex-wrap gap-4">
        {project.githubUrl && (
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white border-2 border-black font-bold shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all"
            whileTap={{ scale: 0.97 }}
          >
            <Github className="w-5 h-5" />
            Code
          </motion.a>
        )}
        {project.deployUrl && (
          <motion.a
            href={project.deployUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-yellow-400 text-black border-2 border-black font-bold shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:bg-yellow-300 transition-all"
            whileTap={{ scale: 0.97 }}
          >
            <ExternalLink className="w-5 h-5" />
            Live
          </motion.a>
        )}
      </div>

      {/* Members */}
      {project.members.length > 0 && (
        <div className="bg-white border-2 border-black rounded-lg p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-black" />
            <span className="text-base font-bold tracking-tight">Team Members</span>
          </div>
          <div className="flex items-center">
            {project.members.slice(0, 4).map((wrapper, index) => {
              const member = wrapper.member;
              return (
                <div key={member.id} className="relative" style={{ marginLeft: index > 0 ? '-14px' : '0' }}>
                  {member.profilePhoto ? (
                    <img
                      src={member.profilePhoto}
                      alt={member.name}
                      title={member.name}
                      className="w-12 h-12 rounded-full border-2 border-black object-cover hover:scale-110 hover:z-10 transition-transform"
                    />
                  ) : (
                    <div
                      className="w-12 h-12 rounded-full border-2 border-black bg-gradient-to-br from-purple-300 to-pink-300 flex items-center justify-center text-black font-bold text-lg"
                      title={member.name}
                    >
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              );
            })}
            {project.members.length > 4 && (
              <div
                className="relative w-12 h-12 rounded-full border-2 border-black bg-black flex items-center justify-center text-white text-sm font-bold"
                style={{ marginLeft: '-14px' }}
              >
                +{project.members.length - 4}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Buttons Row */}
      <div className="flex justify-between items-center">
        {/* Edit/Delete */}
        <div className="flex gap-3">
          <button
            className="p-3 bg-blue-400 border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
            onClick={() => onEdit(project)}
          >
            <Edit3 size={20} />
          </button>
          <button
            className="p-3 bg-red-400 border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
            onClick={() => onDelete(project.id)}
            disabled={isDeleting}
          >
            <Trash2 size={20} />
          </button>
        </div>

        {/* Add/Remove Members */}
        <div className="flex gap-3">
          <button
            className="p-3 bg-green-400 border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
            onClick={handleToggel}
          >
            {addmember ? <X size={20} /> : <Plus size={20} />}
          </button>
          <button
            className="p-3 bg-yellow-400 border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
            onClick={handleRemoveToggel}
          >
            <Users size={20} />
          </button>
        </div>
      </div>

      {/* Member Cards */}
      {addmember && <ProjectMcard handleUser={handleAddUser} members={getAllmembers} />}
      {!isRemoveMember && <ProjectMcard handleUser={handleRemoveUser} members={project.members} />}
    </div>
  </motion.div>
</motion.div>
  );
};