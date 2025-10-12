import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAchievementCall, deleteAchievementCall, deleteMemeber, getAchievementById, getAllAchievements, updateAchievementCall } from "../utils/api/achievement";



export function useAchievement(achievementid?:string){
    const queryclient = useQueryClient()

    const {data:achievements = [],isLoading} = useQuery({
        queryKey:['achievements'],
        queryFn: async()=>{
            const response = await getAllAchievements();
            return response.data
        }
    })

    const {data:achievement,isLoading:achievementloading} = useQuery({
        queryKey:['achievement',achievementid],
        queryFn: async () => {
            const response = await getAchievementById(achievementid as string);
            return response.data
        },
        enabled: !!achievementid
    })

    const createAchievement = useMutation({
        mutationFn:async(formdata:FormData)=>{
            await createAchievementCall(formdata)
        },
        onSuccess:()=>{
            queryclient.invalidateQueries({
                queryKey:['achievements']
            })
        }
    })

    const updateAchievement = useMutation({
        mutationFn : async({formdata,achievementId}:{formdata:FormData,achievementId:string})=>{
            await updateAchievementCall(formdata,achievementId)
        },
        onSuccess: ()=>{
            queryclient.invalidateQueries({
                queryKey:['achievements']
            })
        }
    })

    const deleteAchievement = useMutation({
        mutationFn : async (achievementId:string) => {
            await deleteAchievementCall(achievementId);
        },
        onSuccess: ()=>{
            queryclient.invalidateQueries({
                queryKey:['achievements']
            })
        }

    })

    const removeMemberInAchievement  = useMutation({
        mutationFn: async({achievementId,memberId}:{achievementId:string,memberId:string}) =>{
            await deleteMemeber(memberId,achievementId)
        },
        onSuccess : ()=>{
            queryclient.invalidateQueries({
                queryKey:['achievement',achievementid]
            })
        }
    })

    
   
    return {
        achievements,
        isLoading,
        createAchievement,
        updateAchievement,
        deleteAchievement,
        achievement,
        achievementloading,
        removeMemberInAchievement
    }

}
