import * as z from 'zod';
import { validateRequestBody } from 'zod-express-middleware';
import { _AuthModel, _JwtRefreshTokenModel } from './schema';
export const authUserLogin = _AuthModel.strict();
export const userRefreshToken = _JwtRefreshTokenModel.strict();

export type AuthUserLogin = z.infer<typeof authUserLogin>;
export type UserRefreshToken = z.infer<typeof userRefreshToken>;
export const authUserLoginValidation = validateRequestBody(authUserLogin);
export const userRefreshTokenValidation = validateRequestBody(userRefreshToken);