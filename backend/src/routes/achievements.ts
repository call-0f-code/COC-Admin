import { Router } from "express";
import * as achievementCtrl from "../controllers/achievement.controller";

const router = Router();

// GET /achievements
router.get("/", achievementCtrl.getAchievements);
router.get("/:achievementId", achievementCtrl.getAchievementById);
// create 
// update
router.delete("/:achievementId", achievementCtrl.deleteAchievementById);
router.delete("/:achievementId/members/:memberId", achievementCtrl.removeMemberFromAchievement);


export default router;