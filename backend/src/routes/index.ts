import { Router } from "express";
import memberRouter from "./members.routes";
import topicRouter from "./topics.routes";
import questionRoutes from "./question.routes";
import achievementRouter from "./achievement.routes";
import { Multer } from "multer";
import { auth } from "../middleware/adminAuth";

import projetRouter from "./project.routes";
import siteContentRouter from "./site-content.routes";
import emailRouter from "./email.routes";

export default function routes(upload: Multer ){

    const router = Router();

    router.use('/members', memberRouter(upload));

    router.use(auth);

    router.use('/topics',topicRouter());
    router.use('/questions',questionRoutes());
    router.use("/achievements", achievementRouter(upload));
    router.use('/projects', projetRouter( upload ));
    router.use('/site-content', siteContentRouter(upload));
    router.use('/email', emailRouter());

    return router;
}