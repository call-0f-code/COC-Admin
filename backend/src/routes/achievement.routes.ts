import { Router } from "express";
import * as achievementCtrl from "../controllers/achievement.controller";
import { Response, Request, NextFunction} from "express";
import type { Multer } from "multer";

export function parseAchievementData(req: Request, res: Response, next: NextFunction) {
  if (req.body.achievementData) {
    try {
      req.body.achievementData = JSON.parse(req.body.achievementData);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid JSON in achievementData field' });
    }
  }
  next();
}

export default function achievementRouter(upload: Multer) {
  const router = Router();

  // Create achievement
  router.post("/", upload.single("image"), parseAchievementData, achievementCtrl.createAchievement);
  router.get("/", achievementCtrl.getAchievements);
  router.get("/:achievementId", achievementCtrl.getAchievementById);
  router.patch(
  "/:achievementId",
  upload.single("image"),
  parseAchievementData,
  achievementCtrl.updateAchievement
);
  router.delete("/:achievementId", achievementCtrl.deleteAchievementById);
  router.delete("/:achievementId/members/:memberId", achievementCtrl.removeMemberFromAchievement);


  return router;
}


// const router = Router();

// // GET /achievements
// router.get("/", achievementCtrl.getAchievements);
// router.get("/:achievementId", achievementCtrl.getAchievementById);
// // create 
// // update
// router.delete("/:achievementId", achievementCtrl.deleteAchievementById);
// router.delete("/:achievementId/members/:memberId", achievementCtrl.removeMemberFromAchievement);


// export default router;