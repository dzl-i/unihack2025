import { joinProject } from "../helper/projectHelper";

export async function projectJoin(userId: string, code: string) {
  const project = await joinProject(userId, code);

  if (project === null) throw { status: 404, message: "Project with provided code not found." };

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
  };
}