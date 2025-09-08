import api from "./api"
//dont need this route
export const getQuestion = async(questionId:string)=>{
    const response = await api.get(`/questions/${questionId}`);
    return response.data
}

export const deleteQuestion = async(questionId:string)=>{
    const response = await api.delete(`/questions/${questionId}`);
    return response.data;
}
export const updateQuestion = async(questionId:string,questionData:QuestionForm)=>{
    const response = await api.patch(`/questions/${questionId}`,{questionData});
    return response.data;
}

export const addQuestion = async(topicId:string,questiondata:QuestionForm)=>{
    const response = await api.post(`/topics/${topicId}/questions`,questiondata);
    return response.data;
}



