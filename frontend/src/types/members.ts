declare global {
    type Role = 'SUPER_ADMIN' | 'ADMIN' | 'FOUNDER' | 'MEMBER';

    interface Member {
        id: string;
        name: string;
        email: string;
        profilePhoto?: string | null;
        passoutYear?: string | null;
        isGhosted?: boolean;
        isApproved?: boolean;
        role?: Role;
        // Extended profile fields
        bio?: string | null;
        github?: string | null;
        linkedin?: string | null;
        twitter?: string | null;
        rollNumber?: string | null;
        branch?: string | null;
        year?: string | null;
        phone?: string | null;
        skills?: string[];
        createdAt?: string | null;
    }

    /** Represents the currently logged-in admin with their resolved role */
    interface AdminUser {
        id: string;
        role: Role;
    }

    interface LoginCreds {
        email: string;
        password: string;
    }
    type LoginForm = LoginCreds;
}