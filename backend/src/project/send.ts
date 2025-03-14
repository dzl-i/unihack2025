import { getProjectById, sendMessage } from "../helper/projectHelper";
import { getUserById } from "../helper/userHelper";

export async function projectSendMessage(userId: string, projectId: string, content: string) {
  const project = await getProjectById(projectId);
  if (project === null) throw { status: 404, message: "Project not found." };

  const userIds = project.users.map((user) => user.userId);
  if (!userIds.includes(userId)) throw { status: 403, message: "You do not have access to this project." };

  const user = await getUserById(userId);
  if (user === null) throw { status: 404, message: "User not found." };

  const message = await sendMessage(userId, projectId, content);
  if (message === null) throw { status: 400, message: "Failed to send message." };

  // TODO: Call to Langflow API

  return message; // TODO: Add the response from Langflow API
}