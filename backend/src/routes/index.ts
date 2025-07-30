// import { Router } from "express";
// import topicRouter from "./example.routes";
// import achievementRoutes from "./achievement.routes";

// export default function routes(){
//     const router = Router();

//     router.use('/topics',topicRouter());
//     router.use("/achievements", achievementRoutes);

//     return router;
// }



import { Router } from "express";
import topicRouter from "./topics.routes";
// import projetRouter from "./project.routes";
import questionRoutes from "./question.routes";
import achievementRouter from "./achievement.routes";
import type { Multer } from 'multer';

export default function routes( upload : Multer){
    const router = Router();

    router.use('/topics',topicRouter());
     router.use('/questions',questionRoutes());
    router.use("/achievements", achievementRouter(upload));
    // router.use('/projects', projetRouter( upload ))
    return router;
}