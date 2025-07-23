import "express";

declare global {
    namespace Express {
        interface Request {
            AdminId?:string;
            UserId?: string;
        }
    }
}