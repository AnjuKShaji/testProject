import { Router } from "express"
import { UserControllers } from "../controllers";
import { AuthMiddleware } from "../middleware";
import { createUserValidation, deleteUserValidation, getUserValidation, updateUserValidation } from "../validations";
const authMiddleware = new AuthMiddleware();
export const userRouter = Router();
const userControllers = new UserControllers();
userRouter.get('/', authMiddleware.authenticateToken, userControllers.getAllUsers);
userRouter.get('/:id', getUserValidation, authMiddleware.authenticateToken, userControllers.getOneUsers);
userRouter.post('/', createUserValidation, userControllers.createUser);
userRouter.put('/:id', updateUserValidation, authMiddleware.authenticateToken, userControllers.updateUser);
userRouter.delete('/:id', deleteUserValidation, authMiddleware.authenticateToken, userControllers.deleteUser);