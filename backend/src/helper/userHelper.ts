import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getUserById(id: string) {
  // Prisma Queries
  return await prisma.user.findUnique({
    where: {
      id: id
    }
  });
}

export async function getUserByEmail(email: string) {
  // Prisma Queries
  return await prisma.user.findUnique({
    where: {
      email: email
    }
  });
}
