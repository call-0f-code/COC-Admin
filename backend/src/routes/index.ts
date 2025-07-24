import { Router } from "express";
import topicRouter from "./example.routes";
export default function routes(){
    const router = Router();

    router.use('/topics',topicRouter());
    return router;
}