import { Router } from "express";
import { deleteQuestionById, getQuestionByQuestionId, updateQuestionById } from "../controllers/question.controller";

export default function questionRoutes(){
    const router = Router();

    router.delete('/:questionId',deleteQuestionById);

    router.get('/:questionId',getQuestionByQuestionId);

    router.patch('/:questionId',updateQuestionById);

    return router;
}