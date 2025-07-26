import { z } from "zod";
 
export const createAchievementValidator = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  achievedAt: z.union([
    z.string(),
    z.date()
  ]),
  memberIds: z.array(z.string().min(1)).min(1, "At least one member is required"),
});

export const updateAchievementValidator = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  achievedAt: z.coerce.date().optional(),
  memberIds: z.array(z.string().uuid()).optional(),
  updatedById: z.string().uuid(),
}).refine(data =>
  data.title || data.description || data.achievedAt || data.memberIds, {
  message: "At least one field (title, description, achievedAt, or memberIds) is required for update"
});