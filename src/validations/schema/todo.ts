import * as z from 'zod';

export const _TodoModel = z.object({
    id: z.string(),
    title: z.string(),
    todoStatus: z.string(),
    userId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});