import { Router } from "express";
import memberRouter from "./members.routes";
import { Multer } from "multer";

export default function routes(upload: Multer){
    const router = Router();

    router.use('/members', memberRouter(upload));

    return router;
}