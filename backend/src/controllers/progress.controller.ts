import { Request,Response } from "express";
import { ApiError } from "../utils/apiError";
import api from "../utils/api";

export const getCompletedQuestion = async(req:Request,res:Response)=>{
    const {memberId} = req.params;

    if(!memberId){
        throw new ApiError("missing required field",400);
    }
    
    const response = await api.get(`/progress/${memberId}/completed-questions`);
    const {completedQuestion} = response.data;

    res.status(200).json({
        status:"SUCCESS",
        completedQuestion
    })

}

export const toggleQuestion = async(req:Request,res:Response)=>{
    const {memberId,questionId} = req.params;

    if(!memberId || !questionId){
        throw new ApiError("missing required field",400);
    }
    await api.patch(`/progress/${memberId}/questions/${questionId}/completed/toggle`);
    res.status(200).json({
        status:"SUCCESS"
    })
}