import { Router } from "express";
import topicRouter from "./example.routes";
import projetRouter from "./project.routes";
import { Multer } from 'multer';

export default function routes( upload : Multer){
    const router = Router();

    router.use('/topics',topicRouter());
    router.use('/projects', projetRouter( upload ))
    return router;
}