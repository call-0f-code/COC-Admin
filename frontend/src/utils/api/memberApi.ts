import api from "./api";

export const signIn = async(email: string, password: string) => {
    const response = await api.post('/members/signin', {email: email, password: password});
    return response.data;
}

export const getUnapprovedMembers = async() => {
    const response = await api.get('/members/unapproved');
    return response.data
}

export const approveMember = async(memberId: string,memberName:string,memberEmail:string) => {

    const response = await api.patch(`/members/approve/${memberId}`, {isApproved: true,memberName,memberEmail});
    return response.data;
}

export const allMember =  async () => {
    const response = await  api.get(`/members/allMembers`);
    return response.data;
}

export const signout = async ()=>{
    await api.post('/members/logout');
    return
}
