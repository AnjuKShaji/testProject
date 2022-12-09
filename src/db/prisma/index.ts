import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

export interface Context {
    prisma: PrismaClient;
}

export function createDatabaseContext(): Context {
    return {
        prisma,
    };
}
