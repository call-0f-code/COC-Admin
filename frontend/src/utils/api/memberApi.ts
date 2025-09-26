import api from "./api";

export const signIn = async() => {
    const response = await api.post('/members/signin');
    return response.data;
}

export const getUnapprovedMembers = async() => {
    const response = await api.get('/members/unapproved');
    return response.data
}

export const approveMember = async(memberId: string) => {

    const response = await api.patch(`/members/approve/${memberId}`, {isApproved: true});
    return response.data;
}