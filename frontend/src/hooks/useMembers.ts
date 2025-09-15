import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUnapprovedMembers, approveMember } from "../utils/api/memberApi";


export function useMembers(){
    const queryclient = useQueryClient();

    const {data: members = [], isLoading, isError} = useQuery<Member[]>({
        queryKey:['members'],
        queryFn: async () => {
            const data = await getUnapprovedMembers();
            return data.members;
        }
    })

    const approveCurrentMember = useMutation({
        mutationFn : (memberId: string) => approveMember(memberId),
        onSuccess:()=>{
            queryclient.invalidateQueries({queryKey:['members']})
        }
    })

    return {
        members,
        isLoading,
        isError,
        approveCurrentMember,
    }
}