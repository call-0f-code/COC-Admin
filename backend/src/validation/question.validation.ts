import {z} from 'zod';

export const updateQuestionSchema = z.object({
    questionData:z.object({
        questionName:z.string().min(3).max(100).optional(),
        link:z.url().optional(),
        difficulty:z.enum(['Easy','Medium','Hard']).optional()
    })
});