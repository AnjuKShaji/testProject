import { Router } from "express"
import { TodoControllers } from "../controllers";
import { AuthMiddleware } from "../middleware";
import { createTodoValidation, deleteTodoValidation, getTodoValidation, updateTodoValidation } from "../validations";
export const todoRouter = Router();
const todoControllers = new TodoControllers();

const authMiddleware = new AuthMiddleware()
todoRouter.use('/', (req, res, next) => {
    if (req.method === 'POST') {
        next();
    } else {
        authMiddleware.authenticateToken(req, res, next);
    }
});
todoRouter.use('/:id', (req, res, next) => {
    if (req.method === 'GET') {
        next();
    } else {
        authMiddleware.authenticateToken(req, res, next);
    }
});
// todoRouter.use(authMiddleware.authenticateToken)
todoRouter.get('/', todoControllers.getAllTodos);
todoRouter.get('/:id', getTodoValidation, todoControllers.getOneTodos);
todoRouter.post('/', createTodoValidation, todoControllers.createTodos);
todoRouter.put('/:id', updateTodoValidation, todoControllers.updateTodos);
todoRouter.delete('/:id', deleteTodoValidation, todoControllers.deleteTodos);

