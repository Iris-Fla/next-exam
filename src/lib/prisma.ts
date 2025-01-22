import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config();
}

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let Prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  Prisma = new PrismaClient({
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
  }
  Prisma = global.prisma;
}

export default Prisma;