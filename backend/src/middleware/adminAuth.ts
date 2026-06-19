import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/index'
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';
import api from '../utils/api';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    
    const [scheme,tokenFromHeader] = (req.headers.authorization || '').split(' ');
    const tokenFromCookie = req.cookies.access_token;

    const token = scheme ==='Bearer' && tokenFromHeader? tokenFromHeader:tokenFromCookie;

    if(!token) throw new ApiError('No token provided',401)

    let decoded:JwtPayload;

    try{
        decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
    }catch(err:any){
        if (err.name === 'TokenExpiredError') {
            throw new ApiError('Token expired', 401);
        }
        throw new ApiError('Invalid token', 401);
    }

    req.adminId = decoded.adminId;
    next();

};

/**
 * Middleware that enforces SUPER_ADMIN-only access.
 * Must be placed after `auth` so that req.adminId is already set.
 */
export const superAdminAuth = async (req: Request, res: Response, next: NextFunction) => {
    const adminId = req.adminId;
    if (!adminId) throw new ApiError('Not authenticated', 401);

    const result = await api.get(`/members/?id=${adminId}`);
    const role: string = result.data?.user?.role ?? '';

    if (role !== 'SUPER_ADMIN') {
        throw new ApiError('Forbidden: Only Super Admins can perform this action', 403);
    }

    next();
};