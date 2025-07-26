import jwt, { JwtPayload } from 'jsonwebtoken';
import  config from '../config/index'
import { Request, Response, NextFunction } from 'express';

export const auth = async(req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];

    if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
    }

    const decoded = await jwt.verify(token, config.JWT_SECRET);

    if(!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token"
      })
    }

    req.adminId = (decoded as JwtPayload).adminId;
    next();
  }
};