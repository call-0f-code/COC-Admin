import "express";

declare global {
  namespace Express {
    interface Request {
      memberId?: string;
    }
  }
}