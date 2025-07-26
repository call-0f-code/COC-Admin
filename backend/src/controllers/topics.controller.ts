import { Request,Response } from "express";
import { ApiError } from "../utils/apiError";
import api from "../utils/api";


//check if api throw error for invalid topic id
export const addQuestionBytopicId = async(req:Request,res:Response) =>{
    const topicId = req.params.topicId;
    const adminId = req.AdminId;
    const {questionName,link,difficulty} = req.body;
    if(!topicId || !questionName || !link || !difficulty ){
        throw new ApiError("missing required field",400);
    }
    const response = await api.post(`/topics/${topicId}/questions`,{questionName,link,difficulty,adminId});
    const {newquestion} = response.data
    res.status(200).json({
        status:"SUCCESS",
        question:newquestion
    })
}

export const createNewTopic = async(req:Request,res:Response)=>{
    const {title,description} = req.body;
    const adminId = req.body.adminId;
    if(!title || !description){
        throw new ApiError("missing required field",400);
    }
    const response = await api.post('/topics',{title,description,adminId});
    const topic = response.data;
    res.status(200).json({
        status:"SUCCESS",
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
        status:"SUCCESS"
    })

}

export const getAllTopics = async(req:Request,res:Response)=>{
    const response = await api.get("/topics");
    const topics =response.data;
    
    res.status(200).json({
        status:"SUCCESS",
        topics
    }) 
}

export const getQusetionBytopicId = async(req:Request,res:Response)=>{
    const {topicId} = req.params;
    if(!topicId){
        throw new ApiError("missing required field",400);
    }
    const response = await api.get(`/topics/${topicId}/questions`);

    const {questions} = response.data;

    res.status(200).json({
        status:"SUCCESS",
        questions
    })
}

export const updateTopic = async(req:Request,res:Response)=>{
    const {topicId} =req.params;
    const {updateData} = req.body;
    if(!topicId){
        throw new ApiError("missing required field",400);
    }
    const response = await api.patch(`topics/${topicId}`,{updateData});

    const {updatedTopic} = response.data;

    res.status(200).json({
        status:"SUCCESS",
        updateData
    })
}   



