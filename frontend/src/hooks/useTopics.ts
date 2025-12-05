import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTopic, deletetopic, getAllTopics, updateTopic } from "../utils/api/topicsApi";
import { handleApiError } from "../utils/handleApiError";

export function useTopics(){
    const queryclient = useQueryClient();

    const {data:topics = [],isLoading,isError} = useQuery({
        queryKey:['topics'],
        queryFn: async () => {
            const data = await getAllTopics();
            return data.topics;
        }
    })

    const createNewTopic = useMutation({
        mutationFn: (topic:TopicForm)=>createTopic(topic),
        onSuccess: ()=>{
            queryclient.invalidateQueries({queryKey:['topics']})
        },
         onError: (err) => handleApiError(err),
    })

    const updateCurrentTopic = useMutation({
        mutationFn :(topic:Topic)=>updateTopic(topic.id,{title:topic.title,description:topic.description}),
        onSuccess:()=>{
            queryclient.invalidateQueries({queryKey:['topics']})
        },
         onError: (err) => handleApiError(err),
    })

    const deleteCurrentTopic = useMutation({
        mutationFn:(topicsId:string)=>deletetopic(topicsId),
        onSuccess:()=>{
            queryclient.invalidateQueries({queryKey:['topics']})
        },
         onError: (err) => handleApiError(err),
    })

    return {
        topics,
        isLoading,
        isError,
        createNewTopic,
        updateCurrentTopic,
        deleteCurrentTopic
    }
}