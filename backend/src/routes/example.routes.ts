import { Router } from "express";
import { getQuestionByTopicId } from "../controllers/example.controller";

export default function topicRouter(){
    const router = Router();

    // Route to get questions by topic ID
    router.get('/:topicId/questions', getQuestionByTopicId);

    return router;
}