import { Router } from "express"
import { UsersAuthControllers } from "../controllers";
import { authUserLoginValidation, userRefreshTokenValidation } from "../validations";
export const usersAuthRouter = Router();
const usersAuthControllers = new UsersAuthControllers();

usersAuthRouter.post('/login', authUserLoginValidation, usersAuthControllers.UserLogin);
usersAuthRouter.post('/refresh-token', userRefreshTokenValidation, usersAuthControllers.RefreshToken);