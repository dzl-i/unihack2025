import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function uploadDataSource(projectId: string, name: string, url: string) {
  return await prisma.dataSource.create({
    data: {
      name,
      url,
      project: {
        connect: {
          id: projectId,
        },
      },
    },
    include: {
      project: {
        select: {
          name: true,
        },
      }
    },
  });
}
