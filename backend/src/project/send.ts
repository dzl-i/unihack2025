import { loadLangflow } from "../helper/langflowClient.js";
import { getProjectById, sendMessage } from "../helper/projectHelper.js";
import { getUserById } from "../helper/userHelper.js";

export async function projectSendMessage(
  userId: string,
  projectId: string,
  content: string
) {
  const project = await getProjectById(projectId);
  if (project === null) throw { status: 404, message: "Project not found." };

  const userIds = project.users.map((user) => user.userId);
  if (!userIds.includes(userId))
    throw { status: 403, message: "You do not have access to this project." };

  const user = await getUserById(userId);
  if (user === null) throw { status: 404, message: "User not found." };

  const message = await sendMessage(userId, projectId, content);
  if (message === null) throw { status: 400, message: "Failed to send message." };

  try {
    const flow = await loadLangflow();
    const response = await flow.run(content, {
      tweaks: {
        "AstraDB-lvoxd": {
          advanced_search_filter: `{\"\\\"metadata.metadata.data_source.record_locator.metadata.projectid\\\"\":\"${projectId}\"}`,
        },
      },
    });

    const aiMessage = await sendMessage(
      process.env.ADMIN_ID as string,
      projectId,
      response.chatOutputText() || "Could not retrieve message at this time"
    );
    if (aiMessage === null) throw { status: 400, message: "Failed to send AI message." };

    return {
      messageId: aiMessage.id,
      content: aiMessage.content,
      createdAt: aiMessage.createdAt,
      sender: {
        userId: aiMessage.sender.id,
        name: aiMessage.sender.name,
        email: aiMessage.sender.email,
        profilePic: aiMessage.sender.profilePic,
      },
    };
  } catch (e) {
    console.log(e);
    throw { status: 400, message: "Error retrieving langflow message" };
  }
}
