import { Router } from "express";
import * as memberCtrl from "../controllers/member.controller";
import { auth } from "../middleware/adminAuth";
import {Multer} from "multer";

export default function memberRouter(
    upload: Multer,
) {
    const router = Router();
    
    router.post('/signin', memberCtrl.login);

    router.use(auth);

    router.patch('/approve/:memberId', memberCtrl.approveMember);
    router.get('/unapproved', memberCtrl.getunapprovedMembers);

    return router;
}