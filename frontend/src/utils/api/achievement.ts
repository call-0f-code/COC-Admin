import api from "./api"

export const getAllAchievements = async() =>{
    const response = await api.get("/achievements/")
    return response.data;
}

export const getAchievementById = async (achievementId:string) => {
    const response = await api.get(`/achievements/${achievementId}`)
    return response.data
}

export const createAchievementCall = async(formdata:FormData) =>{
    await api.post("/achievements/",formdata,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
}

export const updateAchievementCall = async(formdata:FormData,achievementId:string) =>{
    await api.patch(`/achievements/${achievementId}`,formdata,{
        headers: {
            "Content-Type":"multipart/form-data"
        }
    })
}

export const deleteAchievementCall = async(achievementId:string)=>{
    await api.delete(`/achievements/${achievementId}`)
}

export const deleteMember = async (memberId:string,achievementId:string) => {
    await api.delete(`/achievements/${achievementId}/members/${memberId}`)
}