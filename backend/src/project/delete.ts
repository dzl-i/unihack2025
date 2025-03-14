import { deleteProject, getProjectById } from "../helper/projectHelper";

export async function projectDelete(userId: string, projectId: string) {
  const project = await getProjectById(projectId);
  if (project === null) throw { status: 404, message: "Project does not exist." };

  const userIds = project.users.map((user) => user.userId);
  if (!userIds.includes(userId)) throw { status: 403, message: "You do not have access to this project." };

  const deletedProject = await deleteProject(projectId);

  return {
    id: deletedProject.id,
    name: deletedProject.name,
  };
}