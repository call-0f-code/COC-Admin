import * as z from 'zod';
type MulterFile = Express.Multer.File;

export const createProjectSchema = z.object({
   projectData : z.object({
     name : z.string(),
    githubUrl : z.url(),
    deployUrl: z.preprocess(
      (val) => (val === "" ? undefined : val), // convert empty string to undefined
      z.string().url().optional()
    ),
   })
})

export const imageSchema = z.custom<MulterFile>((file) => {
  if (!file || typeof file !== 'object') return false;

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  return (
    'mimetype' in file &&
    allowedTypes.includes((file as MulterFile).mimetype) &&
    (file as MulterFile).size <= 2 * 1024* 1024
  );
}, {
  message: 'Invalid image file (must be JPEG/PNG/WEBP and <2MB)',
});


export const updateProjectSchema = z.object({
    projectData: z.object({
        name : z.string().optional(),
        githubUrl : z.url().optional(),
        deployUrl : z.url().optional()
    })
})

export const memberIdSchema = z.object({
    memberId : z.array(z.string())
})


