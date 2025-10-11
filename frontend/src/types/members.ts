declare global {
    interface Member {
        id: string,
        name: string,
        email: string,
        profilePhoto? : string | null
    }

    interface LoginCreds {
        email: string,
        password: string
    }
    type LoginForm = LoginCreds;
}