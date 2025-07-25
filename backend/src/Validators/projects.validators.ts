import * as z from 'zod';
type MulterFile = Express.Multer.File;

export const createProjectSchema = z.object({
    name : z.string(),
    githubUrl : z.string(),
    deployUrl : z.string(),
})

export const imageSchema = z.custom<MulterFile>((file) => {
  if (!file || typeof file !== 'object') return false;

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  return (
    'mimetype' in file &&
    allowedTypes.includes((file as MulterFile).mimetype) &&
    (file as MulterFile).size < 5 * 1024 * 1024 // max 5MB
  );
}, {
  message: 'Invalid image file (must be JPEG/PNG/WEBP and <5MB)',
});


export const updateProjectSchema = z.object({
    name : z.string().optional(),
    githubUrl : z.string().optional(),
    deployUrl : z.string().optional()
})

export const memberIdSchema = z.object({
    memberId : z.array
})


