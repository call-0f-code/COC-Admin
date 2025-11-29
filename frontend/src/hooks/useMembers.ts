import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUnapprovedMembers, approveMember, signIn , allMember} from "../utils/api/memberApi";


export function useMembers(){
    const queryclient = useQueryClient();

    const {data: members = [], isLoading, isError} = useQuery<Member[]>({
        queryKey:['members'],
        queryFn: async () => {
            const data = await getUnapprovedMembers();
            return data.members;
        },
        enabled:!!localStorage.getItem('token')
    })
    
    const {data: getAllmembers = []} = useQuery<Member[]>({
        queryKey:['allmembers'],
        queryFn: async () => {
            const data = await allMember();
            return data.members;
        },
        enabled:!!localStorage.getItem('token')
    })

    const approveCurrentMember = useMutation({
        mutationFn : ({memberId,memberName,memberEmail}:{memberId:string,memberName:string,memberEmail:string}) => approveMember(memberId,memberName,memberEmail),
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
        getAllmembers,
        approveCurrentMember,
        login
    }
}