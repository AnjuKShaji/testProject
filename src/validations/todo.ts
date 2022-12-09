import * as z from 'zod';
import { validateRequest, validateRequestBody } from 'zod-express-middleware';
import { _TodoModel } from './schema';
export const createTodo = _TodoModel
    .partial({
        id: true,
        createdAt: true,
        updatedAt: true,
    })
    .strict();
export const getTodo = z.object({
    id: z.string(),
});
export const updateTodo = _TodoModel.omit({ createdAt: true, updatedAt: true }).partial();
export type CreateTodo = z.infer<typeof createTodo>;
export type UpdateTodo = z.infer<typeof updateTodo>;
export type GetTodo = z.infer<typeof getTodo>;
export type DeleteTodo = z.infer<typeof getTodo>;
export const createTodoValidation = validateRequestBody(createTodo);
export const getTodoValidation = validateRequest({ params: getTodo });
export const deleteTodoValidation = validateRequest({ params: getTodo });
export const updateTodoValidation = validateRequest({
    params: getTodo,
    body: updateTodo,
});
