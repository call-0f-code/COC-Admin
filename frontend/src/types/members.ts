declare global {
    interface Member {
        id: string,
        name: string,
        email: string,
        profilePhoto?: string | null,
        passoutYear?: string | null,
        isGhosted?: boolean,
        isApproved?: boolean,
    }

    interface LoginCreds {
        email: string,
        password: string
    }
    type LoginForm = LoginCreds;
}