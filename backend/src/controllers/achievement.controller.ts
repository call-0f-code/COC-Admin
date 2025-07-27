import { Request, Response } from "express";
import api from "../utils/api";
import { createAchievementValidator, updateAchievementValidator } from "../validators/achievement.validator";
import { ApiError } from "../utils/apiError";
import FormData from "form-data";

export const getAchievements = async (req: Request, res: Response) => {
  const response = await api.get("/achievements");

  if (!response.data?.data) {
    throw new ApiError("Failed to fetch achievements", 500);
  }

  res.status(200).json({
    success: true,
    count: response.data.data.length,
    data: response.data.data,
  });
};


export const getAchievementById = async (req: Request, res: Response) => {
  const achievementId = parseInt(req.params.achievementId);

  if (!achievementId || isNaN(achievementId)) {
    throw new ApiError("Invalid achievement ID", 400);
  }

  const response = await api.get(`/achievements/${achievementId}`);

  if (!response.data?.data) {
    throw new ApiError("Achievement not found", 404);
  }

  res.status(200).json({
    success: true,
    data: response.data.data,
  });
};


export const createAchievement = async (req: Request, res: Response) => {
  const file = req.file;
  const memberId = req.memberId;

  if (!file) {
    throw new ApiError("Image file is missing", 400);
  }

  if (!memberId) {
    throw new ApiError("Member ID is missing", 400);
  }

  const parsed = createAchievementValidator.safeParse(req.body.achievementData);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message || "Invalid input data";
    throw new ApiError(firstError, 400);
  }

  const formData = new FormData();

  formData.append("image", file.buffer, file.originalname);
  formData.append(
    "achievementData",
    JSON.stringify({
      ...parsed.data,
      createdById: memberId,
    })
  );

  const response = await api.post("/achievements", formData, {
    headers: formData.getHeaders(),
  });

  const achievement = response.data;

  res.status(201).json({
    success: true,
    data: achievement,
  });
};


export const updateAchievement = async (req: Request, res: Response) => {
  const file = req.file;
  const achievementId = req.params.achievementId;
  const memberId = req.memberId;

  if (!achievementId) {
    throw new ApiError("Achievement ID is required", 400);
  }

  if (!memberId) {
    throw new ApiError("Member ID is missing", 400);
  }

  let parsedBody = req.body.achievementData;
  if (typeof parsedBody === "string") {
    try {
      parsedBody = JSON.parse(parsedBody);
    } catch {
      throw new ApiError("Invalid JSON in achievementData field", 400);
    }
  }

  parsedBody.updatedById = memberId;

  const validated = updateAchievementValidator.safeParse(parsedBody);
  if (!validated.success) {
    const message = validated.error.issues[0]?.message || "Invalid input";
    throw new ApiError(message, 400);
  }

  const hasUpdateField =
    validated.data.title ||
    validated.data.description ||
    validated.data.achievedAt ||
    (Array.isArray(validated.data.memberIds) && validated.data.memberIds.length > 0);

  if (!hasUpdateField && !file) {
    throw new ApiError(
      "At least one field (title, description, achievedAt, memberIds or image) is required for update",
      400
    );
  }

  const formData = new FormData();
  formData.append("achievementData", JSON.stringify(validated.data));
  if (file) {
    formData.append("image", file.buffer, file.originalname);
  }

  const response = await api.patch(`/achievements/${achievementId}`, formData, {
    headers: formData.getHeaders(),
  });

  const updatedAchievement = response.data;

  res.status(200).json({
    success: true,
    data: updatedAchievement,
  });
};


export const deleteAchievementById = async (req: Request, res: Response) => {
  const achievementId = parseInt(req.params.achievementId);

  if (!achievementId || isNaN(achievementId)) {
    throw new ApiError("Invalid achievement ID", 400);
  }

  const response = await api.delete(`/achievements/${achievementId}`);

  res.status(200).json({
    success: true,
    message: response.data?.message || "Achievement deleted successfully",
  });
};


export const removeMemberFromAchievement = async (req: Request, res: Response) => {
  const achievementId = parseInt(req.params.achievementId);
  const memberId = req.params.memberId;

  if (!achievementId || isNaN(achievementId)) {
    throw new ApiError("Invalid achievement ID", 400);
  }

  if (!memberId) {
    throw new ApiError("Member ID is required", 400);
  }

  const response = await api.delete(`/achievements/${achievementId}/members/${memberId}`);

  res.status(200).json({
    success: true,
    message: response.data?.message || "Member removed from achievement successfully",
  });
};

