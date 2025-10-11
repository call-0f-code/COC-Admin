declare global {
    interface Member {
        id: string,
        name: string,
        email: string,
    }

    interface LoginCreds {
        email: string,
        password: string
    }
    type LoginForm = LoginCreds;
}