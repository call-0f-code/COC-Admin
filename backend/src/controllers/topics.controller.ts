import { Request,Response } from "express";
import { ApiError } from "../utils/apiError";
import api from "../utils/api";


export const addQuestionBytopicId = async(req:Request,res:Response) =>{
    const topicId = req.params.topicId;
    const adminId = req.adminId;
    const {questionName,link,difficulty} = req.body;
    if(!topicId || !adminId){
        throw new ApiError("missing required field",400);
    }
    const response = await api.post(`/topics/${topicId}/questions`,{questionName,link,difficulty,adminId});
    const newquestion = response.data.question
    res.status(200).json({
        status:"SUCCESS",
        question:newquestion
    })
}

export const createNewTopic = async(req:Request,res:Response)=>{
    const {title,description} = req.body;
    const adminId = req.adminId;
    if(!adminId || !title || !description){
        throw new ApiError("missing required field",400);
    }
    const response = await api.post('/topics',{title,description,adminId});
    const topic = response.data;
    res.status(200).json({
        success: true,
        topic
    })
}

export const deleteTopic = async(req:Request,res:Response)=>{
    const {topicId} = req.params;
    if(!topicId){
        throw new ApiError("missing required field",400);
    }
    await api.delete(`/topics/${topicId}`);
    res.status(200).json({
    })

}

export const getAllTopics = async(req:Request,res:Response)=>{
    const response = await api.get("/topics");
    const topics =response.data;
    
    res.status(200).json({
        topics
    }) 
}

export const getQuestionBytopicId = async(req:Request,res:Response)=>{
    const {topicId} = req.params;
    if(!topicId){
        throw new ApiError("missing required field",400);
    }
    const response = await api.get(`/topics/${topicId}/questions`);

    const {questions} = response.data;

    res.status(200).json({
        questions
    })
}

export const updateTopic = async(req:Request,res:Response)=>{
    const {topicId} =req.params;
    const {updateData} = req.body;
     const adminId = req.adminId;
    if(!topicId || !updateData){
        throw new ApiError("missing required field",400);
    }
    const response = await api.patch(`topics/${topicId}`,{updateData,adminId});

    const updatedTopic = response.data;

    res.status(200).json({
        updatedTopic
    })
}   



