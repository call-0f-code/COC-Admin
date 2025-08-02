import { z } from "zod";
 
export const createAchievementSchema = z.object({
  achievementData: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    achievedAt: z.union([z.string(), z.date()]),
    memberIds: z.array(z.string().min(1)).min(1, "At least one member is required"),
  })
});


export const updateAchievementSchema = z.object({
  achievementData: z.object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    achievedAt: z.string().optional(),
    memberIds: z.array(z.string()).optional()
  })
});
