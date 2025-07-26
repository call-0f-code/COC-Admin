import { Router } from "express";
import topicRouter from "./topics.routes";
import questionRoutes from "./question.routes";
export default function routes(){
    const router = Router();

    router.use('/topics',topicRouter());

    router.use('/questions',questionRoutes());

    return router;
}