import { Request,Response } from "express";
import { ApiError } from "../utils/apiError";
import api from "../utils/api";

export const deleteQuestionById = async(req:Request,res:Response)=>{
    const questionId = req.params.questionId;
    if(!questionId){
        throw new ApiError("missing required field",400);
    }
    
    await api.delete(`/questions/${questionId}`);

    res.status(200).json({
        status:"SUCCESS"
    })
    
}

export const getQuestionByQuestionId = async(req:Request,res:Response)=>{

    const {questionId} = req.params;

    if(!questionId){
        throw new ApiError("missing required field",400);
    }

    const response = await api.get(`/questions/${questionId}`);

    const {question} = response.data;
    
    res.status(200).json({
        status:"SUCCESS",
        question
    })

}

export const updateQuestionById = async(req:Request,res:Response)=>{
    const {questionId} = req.params
    const {questionData} =req.body;
    const adminId = req.adminId;
    if(!questionData || !questionId){
        throw new ApiError("missing required field",400);
    }

    const response = await api.patch(`/questions/${questionId}`,{questionData,adminId});
    const {question} = response.data;
    res.status(200).json({
        status:"SUCCESS",
        question
    })

}