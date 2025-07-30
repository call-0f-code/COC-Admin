import { NextFunction, Request,Response } from "express";
import { ApiError } from "../utils/apiError";

export const middleware = async(req:Request,res:Response,next:NextFunction)=>{
    const adminId = req.body.adminId;
    if(!adminId){
        next(new ApiError("Unauthorized Request",401));
    }
    req.AdminId = adminId;
    next();
}   