import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUnapprovedMembers, approveMember, signIn } from "../utils/api/memberApi";


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

    const login = useMutation({
        mutationFn: async (member: LoginCreds) => {
            const data = await signIn(member.email, member.password);
            return data.token;
        },
        onSuccess: (token) => {
            queryclient.invalidateQueries({ queryKey: ['members'] });
            if (token) {
            localStorage.setItem('token', token);
            }
        },
    });

    return {
        members,
        isLoading,
        isError,
        approveCurrentMember,
        login
    }
}