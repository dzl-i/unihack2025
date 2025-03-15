import { createProject } from '../helper/projectHelper';

export async function projectCreate(userId: string, projectName: string) {
  // Generate random code for the project
  const code = generateRandomCode(6);

  const project = await createProject(userId, projectName, code);

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

function generateRandomCode(length: number): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return Array.from(
    { length },
    () => chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('');
}
