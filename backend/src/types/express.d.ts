import "express";
import {MulterFile} from 'multer';

declare global {
    namespace Express {
        interface Request {
            adminId?: string;
            userId?: string;
            projectId ?: string;
            achievementId ?: string;
            file?: MulterFile;
        }
    }
}