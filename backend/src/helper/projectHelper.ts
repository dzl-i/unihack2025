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

export async function listProject(userId: string) {
  return await prisma.project.findMany({
    where: {
      users: {
        some: {
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
          },
        },
      },
    },
  });
}

export async function detailProject(projectId: string) {
  return await prisma.project.findUnique({
    where: {
      id: projectId,
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
          },
        },
      },
      messages: {
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              email: true,
              profilePic: true,
            },
          },
        },
      },
    },
  });
}

export async function getProjectById(projectId: string) {
  return await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      users: true,
    },
  });
}

export async function deleteProject(projectId: string) {
  return await prisma.project.delete({
    where: {
      id: projectId,
    },
  });
}
