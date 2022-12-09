import * as z from 'zod';

export const _UserModel = z.object({
    id: z.string(),
    name: z.string().min(4).max(8),
    email: z.string().email(),
    age: z.number().int().positive().min(18).max(99),
    password: z.string().min(8).max(16),
});