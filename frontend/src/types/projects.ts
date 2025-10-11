export { };

declare global {
  interface projectData {
    name: string,
    githubUrl: string,
    deployUrl: string
  }


 
  interface  project{
    
      id: string;
      name: string;
      imageUrl: string;
      githubUrl: string;
      deployUrl: string | null;
      members: {
        id: string;
        name: string;
        email: string;
        profilePhoto: string | null;
      }[];
   
  }


  interface updateProjectData {
    id: string,
    project_name?: string,
    github_url?: URL,
    deployed_url?: URL

  }
  type addMembersData = {
    memberId: string;
  };

  type projectForm = Omit<projectData, 'id'>;
}