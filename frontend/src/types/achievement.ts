declare global {
    interface Achievement {
        id:string
        title: string;
        description: string;
        achievedAt: string;
        imageUrl: string;
        members: string[];
        memberIds?:string[];
    }
    interface AchievementDb {
        id:string
        title: string;
        description: string;
        achievedAt: string;
        imageUrl: string;
        members?: Array<{ member: Member }>;
        memberIds?:string[];
    }
    
    type Achievementform = Omit<Achievement,'id'>;
    
}
export {};