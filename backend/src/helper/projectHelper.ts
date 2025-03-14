import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createProject(userId: string, name: string, code: string) {
  return await prisma.project.create({
    data: {
      name,
      code,
      users: {
        create: {
          userId: userId,
        },
      },
    },
    include: {
      users: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
              profilePic: true,
            },
          }
        },
      },
    },
  });
}