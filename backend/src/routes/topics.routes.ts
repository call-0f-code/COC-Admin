import { Router } from "express";
import { addQuestionBytopicId, createNewTopic, deleteTopic, getAllTopics, getQuestionBytopicId, updateTopic } from "../controllers/topics.controller";
import { validate } from "../middleware/validates";
import { questionSchema, topicSchema, updateTopicSchema } from "../validation/topic.validation";
import { auth } from "../middleware/adminAuth";

export default function topicRouter(){
    const router = Router();

    router.post('/:topicId/questions', auth, validate(questionSchema),addQuestionBytopicId);

    router.post('/',auth, validate(topicSchema),createNewTopic);

    router.delete('/:topicId',deleteTopic);

    router.get('/',getAllTopics);

    router.get('/:topicId/questions',getQuestionBytopicId);

    router.patch('/:topicId',auth, validate(updateTopicSchema),updateTopic);

    return router;
}

