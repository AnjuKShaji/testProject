import { Request, Response } from 'express';
import { TodoService } from '../services';

const todoService = new TodoService();

export class TodoControllers {

    async getOneTodos(req: Request, res: Response) {
        const { id } = req.params;
        const result = await todoService.getOneTodos(id);
        res.status(200).json(result);
    }
    async getAllTodos(req: Request, res: Response) {
        const result = await todoService.getAllTodos();
        res.status(200).json(result);
    }
    async createTodos(req: Request, res: Response) {
        const result = await todoService.createTodos(req.body);

        res.json(result)
    }
    async updateTodos(req: Request, res: Response) {
        const { id } = req.params;
        const result = await todoService.updateTodos(id, req.body);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    }
    async deleteTodos(req: Request, res: Response) {
        const { id } = req.params;
        const result = await todoService.deleteTodos(id);
        res.json(result);
    }
}
