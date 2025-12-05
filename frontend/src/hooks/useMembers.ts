import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUnapprovedMembers, approveMember, signIn , allMember, signout} from "../utils/api/memberApi";
import { useAuth } from "../context/AuthContext";
import { handleApiError } from "../utils/handleApiError";


export function useMembers(){
    const queryclient = useQueryClient();
    const {accessToken,setAccessToken} = useAuth()

    const {data: members = [], isLoading, isError} = useQuery<Member[]>({
        queryKey:['members'],
        queryFn: async () => {
            const data = await getUnapprovedMembers();
            return data.members;
        },
        enabled:!!accessToken
      
    })
    
    const {data: getAllmembers = []} = useQuery<Member[]>({
        queryKey:['allmembers'],
        queryFn: async () => {
            const data = await allMember();
            return data.members;
        },
    })

    const approveCurrentMember = useMutation({
        mutationFn : ({memberId,memberName,memberEmail}:{memberId:string,memberName:string,memberEmail:string}) => approveMember(memberId,memberName,memberEmail),
        onSuccess:()=>{
            queryclient.invalidateQueries({queryKey:['members']})
        },
         onError: (err) => handleApiError(err),
    })

    const login = useMutation({
        mutationFn: async (member: LoginCreds) => {
            const data = await signIn(member.email, member.password);
            return data.token;
        },
        onSuccess: (token) => {
            queryclient.invalidateQueries({ queryKey: ['members'] });
            if (token) {
                setAccessToken(token);
            }
        },
         onError: (err) => handleApiError(err),
    });

    const logout = useMutation({
        mutationFn: signout,
        onSuccess:()=>{
            setAccessToken(null);
            queryclient.setQueryData(["members"],null)
            window.location.replace("/");
        },
         onError: (err) => handleApiError(err),
    })

    return {
        members,
        isLoading,
        isError,
        getAllmembers,
        approveCurrentMember,
        login,
        logout
    }
}