import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getUnapprovedMembers,
    approveMember,
    signIn,
    allMember,
    signout,
    ghostMember,
    getDeadZoneMembers,
    updateMemberRole,
} from "../utils/api/memberApi";
import { useAuth } from "../context/AuthContext";
import { handleApiError } from "../utils/handleApiError";


export function useMembers() {
    const queryclient = useQueryClient();
    const { accessToken, setAccessToken, setAdminUser } = useAuth();

    const { data: members = [], isLoading, isError } = useQuery<Member[]>({
        queryKey: ['members'],
        queryFn: async () => {
            const data = await getUnapprovedMembers();
            return data.members;
        },
        enabled: !!accessToken,
    });

    const { data: getAllmembers = [] } = useQuery<Member[]>({
        queryKey: ['allmembers'],
        queryFn: async () => {
            const data = await allMember();
            return data.members;
        },
        enabled: !!accessToken,
    });

    const { data: deadZoneMembers = [], isLoading: isDeadZoneLoading } = useQuery<Member[]>({
        queryKey: ['dead-zone'],
        queryFn: async () => {
            const data = await getDeadZoneMembers();
            return data.members;
        },
        enabled: !!accessToken,
    });

    const approveCurrentMember = useMutation({
        mutationFn: ({ memberId, memberName, memberEmail }: { memberId: string; memberName: string; memberEmail: string }) =>
            approveMember(memberId, memberName, memberEmail),
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: ['members'] });
        },
        onError: (err) => handleApiError(err),
    });

    const ghostMemberMutation = useMutation({
        mutationFn: ({ memberId, ghost }: { memberId: string; ghost: boolean }) =>
            ghostMember(memberId, ghost),
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: ['members'] });
            queryclient.invalidateQueries({ queryKey: ['dead-zone'] });
        },
        onError: (err) => handleApiError(err),
    });

    /**
     * Super-Admin only: update a member's role.
     * The backend enforces this guard — the frontend just exposes the mutation.
     */
    const updateRoleMutation = useMutation({
        mutationFn: ({ memberId, role }: { memberId: string; role: Role }) =>
            updateMemberRole(memberId, role),
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: ['allmembers'] });
        },
        onError: (err) => handleApiError(err),
    });

    const login = useMutation({
        mutationFn: (member: LoginCreds) => signIn(member.email, member.password),
        onSuccess: (data) => {
            queryclient.invalidateQueries({ queryKey: ['members'] });

            // Backend returns { token, role, adminId } — read directly, no jwt-decode needed
            if (data.token) {
                setAccessToken(data.token);
            }
            if (data.adminId && data.role) {
                setAdminUser({ id: data.adminId, role: data.role as Role });
            }
        },
        onError: (err) => handleApiError(err),
    });

    const logout = useMutation({
        mutationFn: signout,
        onSuccess: () => {
            setAccessToken(null);
            queryclient.setQueryData(["members"], null);
            window.location.replace("/");
        },
        onError: (err) => handleApiError(err),
    });

    return {
        members,
        isLoading,
        isError,
        getAllmembers,
        deadZoneMembers,
        isDeadZoneLoading,
        approveCurrentMember,
        ghostMemberMutation,
        updateRoleMutation,
        login,
        logout,
    };
}