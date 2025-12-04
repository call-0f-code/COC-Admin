import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProject, deleteProject, getAllProject, updateProject , addMemberToProject , removeMemberFromProjects} from "../utils/api/projectApi";
import { handleApiError } from "../utils/handleApiError";




export function useProjects() {
    const queryclient = useQueryClient();

    const { data: projects = [], isLoading, isError } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const data = await getAllProject();
            return data.data;
        }
    })

    const createNewProject = useMutation({
        mutationFn: ({ projectForm, image }: { projectForm: projectForm; image: File }) =>
            createProject(projectForm, image),
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: ["projects"] });
        },
         onError: (err) => handleApiError(err),
    });


    const updatecurrentProject = useMutation({
        mutationFn: ({ projectForm, image , editingProjectId}: { projectForm: projectForm; image: File  , editingProjectId : string}) =>
            updateProject(projectForm, image , editingProjectId),
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: ['projects'] })
        },
         onError: (err) => handleApiError(err),
    })

    const deletecurrentProject = useMutation({
        mutationFn: (projectId: string) => deleteProject(projectId),
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: ['projects'] })
        },
         onError: (err) => handleApiError(err),
    })

    const addMember = useMutation({
        mutationFn : ( {memberId , projectId } : {memberId : string[] , projectId : string}) =>addMemberToProject(memberId, projectId),
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: ['projects'] })
        },
         onError: (err) => handleApiError(err),
      
    })

    // removeMemberFromProjects

    const removeMember = useMutation({
        mutationFn : ( {memberId , projectId } : {memberId : string , projectId : string}) =>removeMemberFromProjects(memberId, projectId),
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: ['projects'] })
        },
         onError: (err) => handleApiError(err),
    })

    return {
        projects,
        isLoading,
        isError,
        createNewProject,
        addMember,
        removeMember,
        updatecurrentProject,
        deletecurrentProject
    }
}