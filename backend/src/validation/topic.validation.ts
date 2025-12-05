import {z} from 'zod';

export const topicSchema = z.object({
    title:z.string().min(3).max(100),
    description:z.string().min(3).max(5000)
});

export const questionSchema = z.object({
    questionName:z.string().min(3).max(100),
    link:z.url(),
    difficulty:z.enum(['Easy','Medium','Hard'])
});

export const updateTopicSchema = z.object({
    updateData:z.object({
        title:z.string().min(3).max(100).optional(),
        description:z.string().min(3).max(5000).optional() 
    })
});