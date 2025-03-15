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

  const requestBody = {
    input_value: content,
    output_type: "chat",
    input_type: "chat",
    tweaks: {
      "ChatInput-TcBLb": {},
      "ParseData-0oepE": {},
      "Prompt-s82WS": {},
      "ChatOutput-KYRZx": {},
      "OpenAIEmbeddings-cnHCz": {},
      "OpenAIModel-TTn3d": {},
      "AstraDB-lvoxd": {
        // TODO: Comment this out later, need to query metadata.metadata.data_source.record_locator.metadata.projectid key and give the projectid key
        //"advanced_search_filter": "{\"projectId\":\"<YOUR_ID_HERE>\"}"
      },
    },
  };

  const response = await fetch(process.env.LANGFLOW_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LANGFLOW_KEY!}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    return { status: 400, message: "Failed to retrieve a response" };
  }

  const data: any = await response.json();

  // we ball
  const output = data.outputs?.[0]?.outputs?.[0]?.results?.message?.data?.text;
  if (!output) {
    return { status: 400, message: "Failed to retrieve a response" };
  }

  return message
}
