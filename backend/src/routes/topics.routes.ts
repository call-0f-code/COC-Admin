import { Router } from "express";
import { addQuestionBytopicId, createNewTopic, deleteTopic, getAllTopics, getQuestionBytopicId, updateTopic } from "../controllers/topics.controller";
import { validate } from "../middleware/validates";
import { questionSchema, topicSchema, updateTopicSchema } from "../validation/topic.validation";



export default function topicRouter(){
    const router = Router();

    router.post('/:topicId/questions', validate(questionSchema),addQuestionBytopicId);

    router.post('/', validate(topicSchema),createNewTopic);

    router.delete('/:topicId',deleteTopic);

    router.get('/',getAllTopics);

    router.get('/:topicId/questions',getQuestionBytopicId);

    router.patch('/:topicId', validate(updateTopicSchema),updateTopic);

    return router;
}

