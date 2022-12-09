import * as z from 'zod';
import { validateRequest, validateRequestBody } from 'zod-express-middleware';
import { _UserModel } from './schema';
export const createUser = _UserModel
    .partial({
        id: true,
    })
    .strict();
export const getUser = z.object({
    id: z.string(),
});
export const updateUser = _UserModel.partial();
export type CreateUser = z.infer<typeof createUser>;
export type UpdateUser = z.infer<typeof updateUser>;
export type GetUser = z.infer<typeof getUser>;
export type DeleteUser = z.infer<typeof getUser>;
export const createUserValidation = validateRequestBody(createUser);
export const getUserValidation = validateRequest({ params: getUser });
export const deleteUserValidation = validateRequest({ params: getUser });
export const updateUserValidation = validateRequest({
    params: getUser,
    body: updateUser,
});
