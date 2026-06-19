import { Request, Response } from "express";
import api from "../utils/api";
import { ApiError } from "../utils/apiError";
import FormData from "form-data";

// ─── GET ─────────────────────────────────────────────────────────────────────

export const getSiteContent = async (req: Request, res: Response) => {
  const response = await api.get("/site-content");

  res.status(200).json({
    success: true,
    data: response.data,
  });
};

// ─── PATCH hero ───────────────────────────────────────────────────────────────

export const updateSiteContent = async (req: Request, res: Response) => {
  const adminId = req.adminId;
  if (!adminId) throw new ApiError("Admin ID missing", 400);

  const siteContentData = req.body.siteContentData ?? {};
  const file = req.file;

  const formData = new FormData();
  formData.append(
    "siteContentData",
    JSON.stringify({ ...siteContentData, adminId })
  );

  if (file) {
    formData.append("image", file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });
  }

  const response = await api.patch("/site-content", formData, {
    headers: formData.getHeaders(),
  });

  res.status(200).json({
    success: true,
    data: response.data,
  });
};

// ─── PATCH action ─────────────────────────────────────────────────────────────

export const updateSiteAction = async (req: Request, res: Response) => {
  const adminId = req.adminId;
  if (!adminId) throw new ApiError("Admin ID missing", 400);

  const { key } = req.params;
  const actionData = req.body.actionData ?? req.body;

  const response = await api.patch(`/site-content/actions/${key}`, {
    ...actionData,
    adminId,
  });

  res.status(200).json({
    success: true,
    data: response.data,
  });
};

// ─── POST gallery photo ───────────────────────────────────────────────────────

export const addGalleryPhoto = async (req: Request, res: Response) => {
  const adminId = req.adminId;
  if (!adminId) throw new ApiError("Admin ID missing", 400);

  const file = req.file;
  if (!file) throw new ApiError("Image file is required", 400);

  const photoData = req.body.photoData ?? {};

  const formData = new FormData();
  formData.append("image", file.buffer, {
    filename: file.originalname,
    contentType: file.mimetype,
  });
  formData.append(
    "photoData",
    JSON.stringify({ ...photoData, adminId })
  );

  const response = await api.post("/site-content/gallery", formData, {
    headers: formData.getHeaders(),
  });

  res.status(201).json({
    success: true,
    data: response.data,
  });
};

// ─── PATCH gallery photo ──────────────────────────────────────────────────────

export const updateGalleryPhoto = async (req: Request, res: Response) => {
  const adminId = req.adminId;
  if (!adminId) throw new ApiError("Admin ID missing", 400);

  const { photoId } = req.params;
  const photoData = req.body.photoData ?? {};
  const file = req.file;

  const formData = new FormData();
  formData.append(
    "photoData",
    JSON.stringify({ ...photoData, adminId })
  );

  if (file) {
    formData.append("image", file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });
  }

  const response = await api.patch(
    `/site-content/gallery/${photoId}`,
    formData,
    { headers: formData.getHeaders() }
  );

  res.status(200).json({
    success: true,
    data: response.data,
  });
};

// ─── DELETE gallery photo ─────────────────────────────────────────────────────

export const deleteGalleryPhoto = async (req: Request, res: Response) => {
  const adminId = req.adminId;
  if (!adminId) throw new ApiError("Admin ID missing", 400);

  const { photoId } = req.params;

  const response = await api.delete(
    `/site-content/gallery/${photoId}`,
    { data: { adminId } }
  );

  res.status(200).json({
    success: true,
    message: response.data?.message ?? "Photo deleted successfully",
  });
};
