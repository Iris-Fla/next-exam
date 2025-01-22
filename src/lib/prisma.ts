import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}
let Prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  Prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
  console.log("Production");
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
    console.log("Development");
  }
  Prisma = global.prisma;
}

export default Prisma;