import { LangflowClient } from "@datastax/langflow-client";

const langflowId = process.env.LANGFLOW_ID!;
const apiKey = process.env.LANGFLOW_KEY!;
const flowId = process.env.LANGFLOW_FLOWID!;
const langflowClinet = new LangflowClient({ langflowId, apiKey });

export const flow = langflowClinet.flow(flowId)

