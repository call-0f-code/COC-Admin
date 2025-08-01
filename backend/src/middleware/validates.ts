import {z} from 'zod';
import { Request,Response,NextFunction } from 'express';
import { ApiError } from '../utils/apiError';

export const validate = (schema:z.ZodSchema) =>{
    return (req:Request , res:Response ,next:NextFunction)=>{
        try{
           
            const validatedData = schema.parse(req.body);
            req.body = validatedData;
            
            next();
        } catch(error){

            if(error instanceof z.ZodError){
                const errorMessages = error.issues.map((err:any) => {
                    const path = err.path.length > 0 ? err.path.join('.') : 'field';
                    return `${path}: ${err.message}`;
                });
                const errorMessage = errorMessages.join(', ');
                return next( new ApiError(`validation error, ${errorMessage}`,400));
            }

            return next(new ApiError(`validation error occured ${error}`,500));

        }
    }
}