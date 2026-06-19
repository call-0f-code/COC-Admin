import { Router } from "express";
import * as memberCtrl from "../controllers/member.controller";
import { auth, superAdminAuth } from "../middleware/adminAuth";
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
    router.patch('/ghost/:memberId', memberCtrl.ghostMember);
    router.get('/dead-zone', memberCtrl.getDeadZoneMembers);

    // Super-Admin only: change a member's role
    router.patch('/:memberId/role', superAdminAuth, memberCtrl.updateMemberRole);

    return router;
}