import api from "./api"

export const getAllTopics = async() =>{
    const response  = await api.get("/topics/");
    return response.data;
}

export const createTopic = async(topic:TopicForm) =>{
    const response = await api.post('/topics/',{title:topic.title,description:topic.description});
    return response.data;
}

export const updateTopic = async(topicId:string,updateData:TopicForm)=>{
    const response = await api.patch(`/topics/${topicId}`,{updateData});
    return response.data;
}

export const deletetopic = async(topicsId:string) =>{
    const response = await api.delete(`/topics/${topicsId}`);
    return response.data;
}

export const getQuestionBytopic = async(topicId:string)=>{
    const response = await api.get(`/topics/${topicId}/questions`);
    return response.data
}

