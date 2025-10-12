import React, { useState } from 'react';
import { Edit3, ExternalLink, Github, Plus, Trash2, Users, X } from 'lucide-react';

import ProjectMcard from './ProjectMcard';
import { useMembers } from '../../hooks/useMembers';
import  { useProjects } from '../../hooks/useProjects';
import { globalToast } from '../../utils/toast';




interface ProjectCardProps {
  project: project;
  onDelete: (projectId: string) => void;
  onEdit: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onDelete,
  onEdit,
}) => {
  const displayMembers = project.members.slice(0, 3);
  const remainingCount = project.members.length - 3;
  const [isCreating , setisCreating] = useState<boolean>(true);
  const [addmember , setAddmember] = useState<boolean>(false);
  const [confirmationBox, setconfirmationBox] = useState<boolean>(false);
 const { addMember , removeMember  } = useProjects();
 const { getAllmembers } = useMembers();

  
  const  handleToggel = () =>{
    setisCreating(true);
    if( !addmember ){
      setAddmember(true);
    }else{
      setAddmember(false)
    }
  }


  const  handleRemoveToggel = () =>{
    setAddmember(false)
    if( isCreating ){
      setisCreating(false);
    }else{
      setisCreating(true);
    }
  }

  function handleAddUser( id : string) {
      const msg = "member add succussfully"
      const projectMember = [id]
       addMember.mutate(
               { memberId: projectMember , projectId : project.id },
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
  }


  function handleRemoveUser( id : string){
      const msg = "member remove succussfully !!!"
       removeMember.mutate(
               { memberId: id , projectId : project.id },
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
  }


  return (
    <div className="bg-white border-4 border-black overflow-hidden shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:shadow-[12px_12px_0_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
      {/* Project Image */}
      {project.imageUrl && (
        <div className="relative h-52 border-b-4 border-black overflow-hidden bg-gradient-to-br from-cyan-300 to-purple-400">
          <img
            src={project.imageUrl}
            alt={project.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1 pr-4">
            <h3 className="text-3xl font-black text-black mb-2 tracking-tight leading-tight hover:text-purple-600 transition-colors">
              {project.name}
            </h3>
          </div>

          <div className="flex gap-2 flex-shrink-0">
            <button
              className="w-11 h-11 bg-yellow-400 border-3 border-black flex items-center justify-center hover:bg-yellow-300 hover:translate-y-[-2px] active:translate-y-[0px] transition-all shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
              title="Edit Project"
              onClick={() => onEdit(project.id)}
            >
              <Edit3 className="w-5 h-5 text-black" />
            </button>
            <button
              className="w-11 h-11 bg-red-400 border-3 border-black flex items-center justify-center hover:bg-red-300 hover:translate-y-[-2px] active:translate-y-[0px] transition-all shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
              title="Delete Project"
              onClick={() => setconfirmationBox(true)}
            >
              <Trash2 className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>

        {/* Confimation Dialog box */}

        {confirmationBox && (
          <div
            className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50"
            onClick={() => setconfirmationBox(false)}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-80"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
              <p className="mb-6">
                Are you sure you want to Delete Project{' '}
                <b>''{project.name}''</b>
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setconfirmationBox(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => onDelete(project.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* URLs Section */}
        <div className="flex flex-wrap gap-3 mb-6">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white border-3 border-black font-bold hover:bg-gray-800 transition-all shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.3)] hover:translate-x-[-1px] hover:translate-y-[-1px]"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm">Repository</span>
            </a>
          )}
          {project.deployUrl && (
            <a
              href={project.deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-400 text-black border-3 border-black font-bold hover:bg-cyan-300 transition-all shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.3)] hover:translate-x-[-1px] hover:translate-y-[-1px]"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm">Live Demo</span>
            </a>
          )}
        </div>

        {/* Members Section */}

        <div className="border-t-4 border-black pt-5"></div>

        <div className='flex gap-3 justify-end'>
                <button
                  className="w-11 h-11 bg-red-400 border-3 border-black flex items-center justify-center hover:bg-red-300 hover:translate-y-[-2px] active:translate-y-[0px] transition-all shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
                  title="Add Member"
                  onClick={() => {
                          handleToggel();
                        }}
                >
                  { addmember ? ( <X/>) : (<Plus className="w-5 h-5 text-black" />)}
                  
                </button>
                <button
                  className="w-11 h-11 bg-red-400 border-3 border-black flex items-center justify-center hover:bg-red-300 hover:translate-y-[-2px] active:translate-y-[0px] transition-all shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
                  title="Delete member"
                   onClick={ () => { setisCreating(false) ; handleRemoveToggel(); } }
                >
                  <Trash2 className="w-5 h-5 text-black" />
                </button>
              </div>
        {project.members.length > 0 && (
          <div className=" pt-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-black" />
                <span className="font-black text-black tracking-tight text-sm">
                  TEAM MEMBERS
                </span>
              </div>
              
            </div>


            {/* Overlapping Circle Avatars */}
            <div className="flex items-center">
              {displayMembers.map((wrapper, index) => {
                const member = wrapper.member;

                return (
                  <div
                    key={member.id}
                    className="relative"
                    style={{ marginLeft: index > 0 ? '-12px' : '0' }}
                  >
                    {member.profilePhoto ? (
                      <img
                        src={member.profilePhoto}
                        alt={member.name}
                        title={member.name}
                        className="w-12 h-12 rounded-full border-4 border-black object-cover bg-white hover:scale-110 hover:z-10 transition-transform cursor-pointer"
                      />
                    ) : (
                      <div
                        className="w-12 h-12 rounded-full border-4 border-black bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center hover:scale-110 hover:z-10 transition-transform cursor-pointer"
                        title={member.name}
                      >
                        <span className="text-lg font-black text-white">
                          {member.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}

              {remainingCount > 0 && (
                <div
                  className="relative w-12 h-12 rounded-full border-4 border-black bg-black flex items-center justify-center hover:scale-110 hover:z-10 transition-transform cursor-pointer"
                  style={{ marginLeft: '-12px' }}
                  title={`${remainingCount} more member${remainingCount > 1 ? 's' : ''}`}
                >
                  <span className="text-sm font-black text-white">
                    +{remainingCount}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add member to project  */}
        {addmember && (

              <ProjectMcard
                     handleUser = {handleAddUser} 
                     members ={getAllmembers}      />
               
            ) }

            { !isCreating && (
                  <ProjectMcard
                     handleUser = {handleRemoveUser} 
                     members ={project.members}   />
               
            ) }
            
      </div>
    </div>
  );
};
