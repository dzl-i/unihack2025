import { headers, unstructured_api_key, unstructured_api_url } from "./unstructured.js";

// returns job id
export async function runWorkflow(workflow_id:string) {
  const url = new URL(`${unstructured_api_url}/workflows/${workflow_id}/run`);
  url.searchParams.append("unstructured-api-key", unstructured_api_key)
  const response = await fetch(url.toString(), {
    method: 'POST',
    headers
  })
  if (!response.ok) throw { status: 500, message: "Couldn't run workflow"}
  return response.json();
}