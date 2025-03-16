import { FlowResponse } from "@datastax/langflow-client/dist/flow_response";
import { loadLangflow } from "../helper/langflowClient";
import { getProjectById } from "../helper/projectHelper";
import { getUserById } from "../helper/userHelper";

export async function projectGetGraph(userId: string, projectId: string) {
  const project = await getProjectById(projectId);
  if (project === null) throw { status: 404, message: "Project not found." };

  const userIds = project.users.map((user) => user.userId);
  if (!userIds.includes(userId)) throw { status: 403, message: "You do not have access to this project." };

  const user = await getUserById(userId);
  if (user === null) throw { status: 404, message: "User not found." };

  const contentPrompt = `
  You are an Obsidian AI Graph Generator. You have been given a lot of information and you should, to the upmost of your ability, output a json file in the following format of all the concepts and a summary of the important points for each, along with the links between concepts:
  
  {
    concepts: [],
    links: []
  }
  
  where each concept is a concept in the form:
  
  concept: {
    id: (start from 0 and increment by 1),
    concept_name: (concept name),
    summary_notes: (summary notes for the concept in markdown format with headings and subheadings)
  }
  
  and each link in the form:
  link: {
    concept_ids: [concept1_id, concept2_id)
  }
  `;

  console.log("inside graph")
  try {
    const flow = await loadLangflow();
    const response: FlowResponse = await flow.run(contentPrompt, {
      tweaks: {
        "AstraDB-lvoxd":
        {
          "advanced_search_filter": `{\"\\\"metadata.metadata.data_source.record_locator.metadata.projectid\\\"\":\"${projectId}\"}`
        }
      }
    });
    console.log(response)
    return response.chatOutputText() || "Could not retrieve message at this time"
  } catch (e) {
    throw { status: 400, message: "Error retrieving langflow message" }
  }
}
