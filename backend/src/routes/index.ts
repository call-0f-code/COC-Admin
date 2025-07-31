import { Router } from "express";
import memberRouter from "./members.routes";
import topicRouter from "./topics.routes";
import questionRoutes from "./question.routes";
import { Multer } from "multer";

export default function routes(upload: Multer){

    const router = Router();

    router.use('/members', memberRouter(upload));

    router.use('/topics',topicRouter());

    router.use('/questions',questionRoutes());

    return router;
}