import { PrismaClient } from '@prisma/client';
import { env } from 'node:process';

export const prisma = new PrismaClient({
    datasourceUrl: env.DATABASE_URL,
    transactionOptions: {
        timeout: 20000,
    },
}); 

export default prisma;
