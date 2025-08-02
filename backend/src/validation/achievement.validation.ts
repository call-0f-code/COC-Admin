import { z } from "zod";
type MulterFile = Express.Multer.File;

export const imageSchema = z.custom<MulterFile>((file) => {
  if (!file || typeof file !== 'object') return false;

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  return (
    'mimetype' in file &&
    allowedTypes.includes((file as MulterFile).mimetype) &&
    (file as MulterFile).size <= 2 * 1024 * 1024 
  );
}, {
  message: 'Invalid image file (must be JPEG/PNG/WEBP and <2MB)',
});

 
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
    achievedAt: z.union([z.string(), z.date()]).optional(),
    memberIds: z.array(z.string()).optional()
  })
});
