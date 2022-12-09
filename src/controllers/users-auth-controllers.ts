import { Request, Response } from 'express';
import { UsersAuthService } from '../services';

const usersAuthService = new UsersAuthService();

export class UsersAuthControllers {

    async UserLogin(req: Request, res: Response) {
        const result = await usersAuthService.UserLogin(req.body);
        res.status(result.statusCode).json(result);
    }
    async RefreshToken(req: Request, res: Response) {
        const result = await usersAuthService.RefreshToken(req.body);
        res.status(result.statusCode).json(result);
    }

}