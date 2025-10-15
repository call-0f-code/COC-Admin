import api from "./api"

export const getAllProject = async() =>{
    const response  = await api.get("/projects/");
    return response.data;
}

export const getProjectById = async( projectId : string) => {
    const response = await api.get(`/projects/${projectId}`);
    return response.data;
}

export const getmemberByprojectId = async( projectId : string) => {
    const response = await api.get(`/projects/${projectId}/members/`);
    return response.data;
}

export const createProject = async (projectData: projectForm, image: File) => {
  const formData = new FormData();
  formData.append("projectData", JSON.stringify(projectData));
  formData.append("image", image);

  const response = await api.post(`/projects/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};



export const updateProject = async( projectData: projectForm, image: File , editingProjectId : string ) => {
  const formData = new FormData();
  formData.append("projectData", JSON.stringify(projectData));
  if( image != null)  formData.append("image", image);
 
    const response = await api.patch(`/projects/${editingProjectId}` , formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
    return response.data;
}

export const deleteProject = async ( projectId : string) => {
    const response = await api.delete(`/projects/${projectId}`);
    return response.data;
}

export const addMemberToProject = async( memberId : string[] , projectId: string) => {
    const response = await api.post(`/projects/${projectId}/members` , { memberId });
    return response.data;
}

export const removeMemberFromProjects = async ( memberId : string , projectId : string) => {
    const response = await api.delete(`/projects/${projectId}/members/${memberId}`);
    return response.data;
}