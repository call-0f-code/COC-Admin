import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/index'
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        throw new ApiError('not authorized, no token',401)
    }

    const decoded = await jwt.verify(token, config.JWT_SECRET);

    if (!decoded) {
        throw new ApiError('Invalid token or token expired',401)
    }

    req.adminId = (decoded as JwtPayload).adminId;
    next();

};