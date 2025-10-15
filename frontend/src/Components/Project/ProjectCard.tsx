import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Edit3,
  ExternalLink,
  Github,
  Plus,
  Trash2,
  Users,
  X,
} from "lucide-react";
import ProjectMcard from "./ProjectMcard";
import { useMembers } from "../../hooks/useMembers";
import { useProjects } from "../../hooks/useProjects";
import { globalToast } from "../../utils/toast";

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
     try {
      await addMember.mutateAsync({ memberId: id, projectId: project.id });
      globalToast("Member added successfully", "success");
      setAddmember(false);
    } catch (error) {
      globalToast("Failed to add member", "error");
    }
  };

  const handleRemoveUser = async (id: string) => {
    try {
      await removeMember.mutateAsync({ memberId: id, projectId: project.id });
     globalToast("Member removed successfully", "success");
      setRemoveMember(false);
    } catch (error) {
      globalToast("Failed to remove member", "error");
    }
  };

  const displayMembers = project.members.slice(0, 4);
  const remainingCount = project.members.length - displayMembers.length;

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ y: 0 }}
      whileHover={{ y: -10 }}
    >
      {/* Layered File Effect */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-neutral-300 border-2 border-black"
        style={{ zIndex: 0, rotate: "-2deg" }}
      />
      <motion.div
        className="absolute inset-0 rounded-xl bg-neutral-200 border-2 border-black"
        style={{ zIndex: 1, rotate: "1deg", top: 4, left: 4 }}
      />

      {/* Main Card */}
      <motion.div
        className="relative bg-white border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-xl overflow-hidden"
        style={{ zIndex: 2 }}
        whileHover={{
          rotate: 0,
          scale: 1.02,
          transition: { type: "spring", stiffness: 200 },
        }}
      >
        {/* Project Header */}
        <div className="relative h-48 overflow-hidden border-b-4 border-black bg-gradient-to-br from-yellow-100 to-amber-200">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.name}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-5xl font-black text-black opacity-30">
              {project.name.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white px-4 py-2">
            <h3 className="text-xl font-bold tracking-tight">{project.name}</h3>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-4">

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white border-2 border-black font-bold shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[5px_5px_0_0_rgba(0,0,0,1)] transition-all"
                whileTap={{ scale: 0.97 }}
              >
                <Github className="w-4 h-4" />
                Code
              </motion.a>
            )}
            {project.deployUrl && (
              <motion.a
                href={project.deployUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black border-2 border-black font-bold shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:bg-yellow-300 transition-all"
                whileTap={{ scale: 0.97 }}
              >
                <ExternalLink className="w-4 h-4" />
                Live
              </motion.a>
            )}
          </div>

          {/* Members */}
          {project.members.length > 0 && (
            <div className="bg-white border-2 border-black rounded-lg p-3 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-black" />
                <span className="text-sm font-bold tracking-tight">
                  Team Members
                </span>
              </div>
              <div className="flex items-center">
                {displayMembers.map((wrapper, index) => {
                  const member = wrapper.member;
                  return (
                    <div
                      key={member.id}
                      className="relative"
                      style={{ marginLeft: index > 0 ? "-12px" : "0" }}
                    >
                      {member.profilePhoto ? (
                        <img
                          src={member.profilePhoto}
                          alt={member.name}
                          title={member.name}
                          className="w-10 h-10 rounded-full border-2 border-black object-cover hover:scale-110 hover:z-10 transition-transform"
                        />
                      ) : (
                        <div
                          className="w-10 h-10 rounded-full border-2 border-black bg-gradient-to-br from-purple-300 to-pink-300 flex items-center justify-center text-black font-bold"
                          title={member.name}
                        >
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  );
                })}
                {remainingCount > 0 && (
                  <div
                    className="relative w-10 h-10 rounded-full border-2 border-black bg-black flex items-center justify-center text-white text-xs font-bold"
                    style={{ marginLeft: "-12px" }}
                  >
                    +{remainingCount}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Buttons Row */}
          <div className="flex justify-between items-center">
            {/* Edit/Delete */}
            <div className="flex gap-2">
              <button
                className="p-2 bg-blue-400 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
                onClick={() => onEdit(project)}
              >
                <Edit3 size={18} />
              </button>
              <button
                className="p-2 bg-red-400 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
                onClick={() => onDelete(project.id)}
                disabled={isDeleting}
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Add/Remove Members */}
            <div className="flex gap-2">
              <button
                className="p-2 bg-green-400 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
                onClick={handleToggel}
              >
                {addmember ? <X size={18} /> : <Plus size={18} />}
              </button>
              <button
                className="p-2 bg-yellow-400 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
                onClick={handleRemoveToggel}
              >
                <Users size={18} />
              </button>
            </div>
          </div>

          {/* Member Cards */}
          {addmember && (
            <ProjectMcard handleUser={handleAddUser} members={getAllmembers} />
          )}
          {!isRemoveMember && (
            <ProjectMcard
              handleUser={handleRemoveUser}
              members={project.members}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
