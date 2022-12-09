import * as z from 'zod';

export const _AuthModel = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(16),
});

export const _JwtRefreshTokenModel = z.object({
    jwtRefreshToken: z.string(),
});