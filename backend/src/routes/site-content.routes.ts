import { Router, Request, Response, NextFunction } from "express";
import type { Multer } from "multer";
import * as siteContentCtrl from "../controllers/site-content.controller";

function parseSiteContentData(req: Request, res: Response, next: NextFunction) {
  if (req.body.siteContentData && typeof req.body.siteContentData === "string") {
    try {
      req.body.siteContentData = JSON.parse(req.body.siteContentData);
    } catch {
      return res.status(400).json({ message: "Invalid JSON in siteContentData field" });
    }
  }
  next();
}

function parsePhotoData(req: Request, res: Response, next: NextFunction) {
  if (req.body.photoData && typeof req.body.photoData === "string") {
    try {
      req.body.photoData = JSON.parse(req.body.photoData);
    } catch {
      return res.status(400).json({ message: "Invalid JSON in photoData field" });
    }
  }
  next();
}

export default function siteContentRouter(upload: Multer) {
  const router = Router();

  // GET site content (public-safe, no auth needed on this route level — auth is on parent)
  router.get("/", siteContentCtrl.getSiteContent);

  // PATCH hero image / caption / altText
  router.patch(
    "/",
    upload.single("image"),
    parseSiteContentData,
    siteContentCtrl.updateSiteContent
  );

  // PATCH site action (e.g. recruitment toggle)
  router.patch("/actions/:key", siteContentCtrl.updateSiteAction);

  // POST new gallery photo
  router.post(
    "/gallery",
    upload.single("image"),
    parsePhotoData,
    siteContentCtrl.addGalleryPhoto
  );

  // PATCH existing gallery photo
  router.patch(
    "/gallery/:photoId",
    upload.single("image"),
    parsePhotoData,
    siteContentCtrl.updateGalleryPhoto
  );

  // DELETE gallery photo
  router.delete("/gallery/:photoId", siteContentCtrl.deleteGalleryPhoto);

  return router;
}
