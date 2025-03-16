import { LangflowClient } from "@datastax/langflow-client";

//const langflowId = process.env.LANGFLOW_ID!;
const langflowUrl = process.env.LANGFLOW_BASEURL!;
const apiKey = process.env.LANGFLOW_KEY!;
const flowId = process.env.LANGFLOW_FLOWID!;

export const loadLangflow = async () => {
  const { LangflowClient } = await import("@datastax/langflow-client");
  const langflowClient = new LangflowClient({ baseUrl: langflowUrl, apiKey });
  return langflowClient.flow(flowId);
};
