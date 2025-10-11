declare global {
    interface Member {
        id: string,
        name: string,
        email: string,
        profilePhoto? : string | null
    }
    type LoginForm = LoginCreds;
}