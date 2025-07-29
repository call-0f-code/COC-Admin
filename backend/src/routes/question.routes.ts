import { Router } from "express";
import { deleteQuestionById, getQuestionByQuestionId, updateQuestionById } from "../controllers/question.controller";
import { validate } from "../middleware/validates";
import { updateQuestionSchema } from "../validation/question.validation";
import { middleware } from "../middleware/example.middleware";

export default function questionRoutes(){
    const router = Router();

    router.delete('/:questionId',deleteQuestionById);

    router.get('/:questionId',getQuestionByQuestionId);

    router.patch('/:questionId',middleware,validate(updateQuestionSchema),updateQuestionById);

    return router;
}