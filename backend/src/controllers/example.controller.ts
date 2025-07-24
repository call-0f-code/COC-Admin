import { Request,Response } from "express"
import { ApiError } from "../utils/apiError";
import api from "../utils/api";

export const getQuestionByTopicId = async(req:Request,res:Response)=>{
    const topicId = req.params.topicId;
    if(!topicId){
        throw new ApiError('Topic ID is required', 400);
    }
    console.log(topicId);
    const response  = await api.get(`/topics/${topicId}/questions`);

    const {questions} = response.data;

    res.status(200).json({
        success: true,
        data: questions
    })

}