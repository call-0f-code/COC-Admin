import { Router } from "express";
import * as memberCtrl from "../controllers/member.controller";
import { auth } from "../middleware/adminAuth";
import {Multer} from "multer";
import { validate } from "../middleware/validates";
import { SigninSchema } from "../validation/member.validation";

export default function memberRouter(
    upload: Multer,
) {
    const router = Router();
    
    router.post('/signin', validate(SigninSchema), memberCtrl.login);
    router.post('/refresh',memberCtrl.tokenRefresh);
    router.post('/logout',memberCtrl.logout);
    
    router.use(auth);

    router.patch('/approve/:memberId', memberCtrl.approveMember);
    router.get('/unapproved', memberCtrl.getunapprovedMembers);
    router.get('/allMembers', memberCtrl.getAllMembers);

    return router;
}