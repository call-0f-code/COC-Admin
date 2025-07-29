import { Router } from "express";

import { addQuestionBytopicId, createNewTopic, deleteTopic, getAllTopics, getQusetionBytopicId, updateTopic } from "../controllers/topics.controller";
import { validate } from "../middleware/validates";
import { questionSchema, topicSchema, updateTopicSchema } from "../validation/topic.validation";
import { middleware } from "../middleware/example.middleware";

export default function topicRouter(){
    const router = Router();

    router.get('/:topicId/questions', getQusetionBytopicId);

    router.post('/:topicId/questions',middleware,validate(questionSchema),addQuestionBytopicId);

    router.post('/',middleware,validate(topicSchema),createNewTopic);

    router.delete('/:topicId',deleteTopic);

    router.get('/',getAllTopics);

    router.get('/:topicId/questions',getQusetionBytopicId);

    router.patch('/:topicId',middleware,validate(updateTopicSchema),updateTopic);

    return router;
}

