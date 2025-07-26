import { Router } from "express";
import topicRouter from "./example.routes";
import achievementRoutes from "./achievements";

export default function routes(){
    const router = Router();

    router.use('/topics',topicRouter());
    router.use("/achievements", achievementRoutes);

    return router;
}