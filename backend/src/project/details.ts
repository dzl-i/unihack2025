import { detailProject } from "../helper/projectHelper";

export async function projectDetails(userId: string, projectId: string) {
  const project = await detailProject(projectId);

  if (project === null) throw { status: 404, message: "Project does not exist." };

  const userIds = project.users.map((user) => user.userId);
  if (!userIds.includes(userId)) throw { status: 403, message: "You do not have access to this project." };

  return {
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
    messages: project.messages.map((message) => ({
      messageId: message.id,
      content: message.content,
      sender: {
        userId: message.sender.id,
        name: message.sender.name,
        email: message.sender.email,
        profilePic: message.sender.profilePic,
      },
    })),
    dataSources: project.dataSources.map((dataSource) => ({
      dataSourceId: dataSource.id,
      name: dataSource.name,
    })),
  };
}
