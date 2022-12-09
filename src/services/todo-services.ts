import { Prisma } from '@prisma/client';
import { createDatabaseContext } from '../db';
import { CreateTodo, UpdateTodo } from '../validations';
export class TodoService {
    private readonly db = createDatabaseContext();
    async getOneTodos(id: string) {
        const todos = await this.db.prisma.todo.findUnique({
            where: {
                id
            },
            include: {
                user: true
            }
        })
        return { todos };
    }
    async getAllTodos() {
        const todos = await this.db.prisma.todo.findMany();
        return { todos };
    }
    async createTodos(todo: CreateTodo) {
        try {
            const todos = await this.db.prisma.todo.create({
                data: todo
            })
            return { todos };

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                console.log(error.code)
                console.log("error is here")
                if (error.code === 'P2003') {
                    return { message: 'user not exist with the userid' }
                }
            }
        }
    }
    async updateTodos(id: string, todo: UpdateTodo) {
        const todos = await this.db.prisma.todo.update({
            data: todo,
            where: {
                id
            }
        })
        return { todos };
    }
    async deleteTodos(id: string) {
        const todos = await this.db.prisma.todo.delete({
            where: {
                id
            }
        })
        return { todos };
    }
}