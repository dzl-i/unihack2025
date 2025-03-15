import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function uploadDataSource(projectId: string, name: string) {
  return await prisma.dataSource.create({
    data: {
      name,
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

export async function getDataSourceById(dataSourceId: string) {
  return await prisma.dataSource.findUnique({
    where: {
      id: dataSourceId,
    },
    include: {
      project: {
        include: {
          users: true,
        },
      },
    },
  });
}

export async function deleteDataSource(dataSourceId: string) {
  return await prisma.dataSource.delete({
    where: {
      id: dataSourceId,
    }
  });
}
