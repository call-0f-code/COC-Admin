declare global {
    interface Member {
        id: string,
        name: string,
        email: string,
        password: string
    }

    type LoginForm = Omit<Member,'id' | 'name'>;
}