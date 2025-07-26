import { Request, Response } from "express";
import api from "../utils/api";
import { ApiError } from "../utils/apiError";

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



// create 


// update




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

