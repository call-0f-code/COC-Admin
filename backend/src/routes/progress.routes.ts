import { Router } from "express";

import { addQuestionBytopicId, createNewTopic, deleteTopic, getAllTopics, getQusetionBytopicId, updateTopic } from "../controllers/topics.controller";

export default function topicRouter(){
    const router = Router();

    router.get('/:topicId/questions', getQusetionBytopicId);

    router.post('/:topicId/questions',addQuestionBytopicId);

    router.post('/',createNewTopic);

    router.delete('/:topicId',deleteTopic);

    router.get('/',getAllTopics);

    router.get('/:topicId/questions',getQusetionBytopicId);

    router.patch('/:topicId',updateTopic);

    return router;
}
