import { addCollaborator, getProjectById } from "../helper/projectHelper";
import { getUserByEmail } from "../helper/userHelper";

export async function projectAddCollaborator(userId: string, projectId: string, collaboratorEmail: string) {
  const project = await getProjectById(projectId);
  if (project === null) throw { status: 404, message: "Project not found." };

  const userIds = project.users.map((user) => user.userId);
  if (!userIds.includes(userId)) throw { status: 403, message: "You do not have access to this project." };

  const collaborator = await getUserByEmail(collaboratorEmail);
  if (collaborator === null) throw { status: 404, message: "Collaborator not found." };

  const newProject = await addCollaborator(projectId, collaborator.id);
  if (newProject === null) throw { status: 400, message: "Failed to add collaborator." };

  return {
    projectId: newProject.id,
    name: newProject.name,
    code: newProject.code,
    isShared: newProject.isShared,
    users: newProject.users.map((user) => ({
      userId: user.userId,
      name: user.user.name,
      email: user.user.email,
      profilePic: user.user.profilePic,
    })),
    messages: newProject.messages.map((message) => ({
      messageId: message.id,
      content: message.content,
      sender: {
        userId: message.sender.id,
        name: message.sender.name,
        email: message.sender.email,
        profilePic: message.sender.profilePic,
      },
    })),
    dataSources: newProject.dataSources.map((dataSource) => ({
      dataSourceId: dataSource.id,
      name: dataSource.name,
    })),
  };
}