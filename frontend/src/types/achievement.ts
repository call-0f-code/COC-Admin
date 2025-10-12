declare global {
    interface Achievement {
        id:string
        title: string;
        description: string;
        achievedAt: string;
        imageUrl: string;
        members: Array<{ member: Member }>;
    }

    
}