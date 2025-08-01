import { Router } from "express";
import { deleteQuestionById, getQuestionByQuestionId, updateQuestionById } from "../controllers/question.controller";
import { validate } from "../middleware/validates";
import { updateQuestionSchema } from "../validation/question.validation";

export default function questionRoutes(){
    const router = Router();

    router.delete('/:questionId',deleteQuestionById);

    router.get('/:questionId',getQuestionByQuestionId);

    router.patch('/:questionId', validate(updateQuestionSchema),updateQuestionById);

    return router;
}