import { Router } from "express";

import { addQuestionBytopicId, createNewTopic, deleteTopic, getAllTopics, getQuestionBytopicId, updateTopic } from "../controllers/topics.controller";
import { validate } from "../middleware/validates";
import { questionSchema, topicSchema, updateTopicSchema } from "../validation/topic.validation";
import { middleware } from "../middleware/example.middleware";

export default function topicRouter(){
    const router = Router();

    router.post('/:topicId/questions',middleware,validate(questionSchema),addQuestionBytopicId);

    router.post('/',middleware,validate(topicSchema),createNewTopic);

    router.delete('/:topicId',deleteTopic);

    router.get('/',getAllTopics);

    router.get('/:topicId/questions',getQuestionBytopicId);

    router.patch('/:topicId',middleware,validate(updateTopicSchema),updateTopic);

    return router;
}

