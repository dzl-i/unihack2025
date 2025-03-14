import { listProject } from "../helper/projectHelper";

export async function projectList(userId: string) {
  const projects = await listProject(userId);

  if (projects === null) throw { status: 400, message: "No projects found." };

  return projects.map((project) => ({
    projectId: project.id,
    name: project.name,
    code: project.code,
    isShared: project.isShared,
    users: project.users.map((user) => ({
      userId: user.userId,
      name: user.user.name,
      email: user.user.email,
      profilePic: user.user.profilePic,
    })),
  }));
}
