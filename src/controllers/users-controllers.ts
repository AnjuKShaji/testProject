import { Request, Response } from 'express';
import { UserService } from '../services';

const userService = new UserService();

export class UserControllers {

    async getOneUsers(req: Request, res: Response) {
        const { id } = req.params;
        const result = await userService.getOneUsers(id);
        res.status(200).json(result);
    }
    async getAllUsers(req: Request, res: Response) {
        const result = await userService.getAllUsers();
        res.status(200).json(result);
    }
    async createUser(req: Request, res: Response) {
        const result = await userService.createUser(req.body);

        res.status(result.statusCode).json(result);
    }
    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const result = await userService.updateUser(id, req.body);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        const result = await userService.deleteUser(id);
        res.status(result.statusCode ? result.statusCode : 200).json(result);
    }
}