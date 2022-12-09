import { Prisma } from '@prisma/client';
import { createDatabaseContext } from '../db';
import { generatePasswordHash } from '../utils';
import { CreateUser, UpdateUser } from '../validations';
export class UserService {
    private readonly db = createDatabaseContext();
    async getOneUsers(id: string) {
        const users = await this.db.prisma.users.findUnique({
            where: {
                id
            }
        })
        return { users };
    }
    async getAllUsers() {
        const users = await this.db.prisma.users.findMany({
            select: {
                todo: true,
                id: true,
                email: true,
                name: true,
                updatedAt: true,
                createdAt: true,
            }
        });
        return { users };
    }


    async createUser(user: CreateUser) {
        try {
            const userCount = await this.db.prisma.users.count({
                where: {
                    email: user.email
                },


            })
            console.log("userCount", userCount)
            if (userCount > 0) {
                return { message: 'email already exists', statusCode: 400 }
            }
            const users = await this.db.prisma.users.create({
                data: {
                    ...user,
                    password: generatePasswordHash(user.password),
                }
            })
            return { users: { ...users, password: undefined }, statusCode: 201 };
        } catch (error) {
            console.log("error", error)
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                console.log(error.code)
                console.log("error is here")
                if (error.code === 'P2002') {
                    return { message: 'email already exists', statusCode: 400 }
                }
            }
            return { message: 'something went wrong', statusCode: 500 }
        }

    }

    async updateUser(id: string, user: UpdateUser) {
        const users = await this.db.prisma.users.update({
            data: user,
            where: {
                id
            }
        })
        return users;
    }

    async deleteUser(id: string) {
        try {
            const userCount = await this.db.prisma.users.count({
                where: {
                    id
                }
            })
            console.log("userCount", userCount)
            if (userCount === 0) {
                return { message: 'ueser not found', statusCode: 404 }
            }
            await this.db.prisma.users.delete({
                where: {
                    id
                }
            })
            return { message: 'delete request' };
        } catch (error) {

            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                console.log(error.code)
                if (error.code === 'P2025') {
                    return { message: 'ueser not found', statusCode: 404 }
                }
                console.log("error is here")
            }
            return { message: 'something went wrong', statusCode: 500 }
        }

    }
}