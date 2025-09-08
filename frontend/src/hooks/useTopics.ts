import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTopic, deletetopic, getAllTopics, updateTopic } from "../utils/api/topicsApi";



export function useTopics(){
    const queryclient = useQueryClient();

    const {data:topics = [],isLoading,isError} = useQuery<topicData[],Error>({
        queryKey:['topics'],
        queryFn: async () => {
            const data = await getAllTopics();
            return data.topics;
        }
    })

    const createNewTopic = useMutation({
        mutationFn: (topic:topicData)=>createTopic(topic),
        onSuccess: ()=>{
            queryclient.invalidateQueries({queryKey:['topics']})
        }
    })

    const updateCurrentTopic = useMutation({
        mutationFn :(topic:topicData)=>updateTopic(topic.id,{title:topic.title,description:topic.description}),
        onSuccess:()=>{
            queryclient.invalidateQueries({queryKey:['topics']})
        }
    })

    const deleteCurrentTopic = useMutation({
        mutationFn:(topicsId:string)=>deletetopic(topicsId),
        onSuccess:()=>{
            queryclient.invalidateQueries({queryKey:['topics']})
        }
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