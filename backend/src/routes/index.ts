import { Router } from "express";
import topicRouter from "./example.routes";
import memberRouter from "./members.routes";
import { Multer } from "multer";

export default function routes(upload: Multer){
    const router = Router();

    router.use('/members', memberRouter(upload));

    router.use('/topics',topicRouter());
    return router;
}