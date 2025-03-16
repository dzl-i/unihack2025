import { headers, unstructured_api_url } from "./unstructured.js"

interface CreateWorkflowResponse {
id: string;
}

const partition_node = {
  name: "Partitioner",
  type: "partition",
  subtype: "vlm",
  settings: {
    provider: "anthropic",
    model: "claude-3-5-sonnet-20241022",
    output_format: "text/html",
    user_prompt: null,
    format_html: true,
    unique_element_ids: true,
    is_dynamic: true,
    allow_fast: true
  }
}

const image_summarizer_node = {
  name:"Image summarizer",
  subtype:"openai_image_description",
  type:"prompter",
  settings:{}
}

const table_summarizer_node = {
  name:"Table summarizer",
  subtype:"anthropic_table_description",
  type:"prompter",
  settings:{}
}

const named_entity_recognizer_node = {
  name:"Named entity recognizer",
  subtype:"openai_ner",
  type:"prompter",
  settings:{
      prompt_interface_overrides: null
  }
}

const chunk_node = {
  name:"Chunker",
  subtype:"chunk_by_title",
  type:"chunk",
  settings:{
    multipage_sections: false,
    combine_text_under_n_chars: 0,
    include_orig_elements: true,
    new_after_n_chars: 1500,
    max_characters: 2048,
    overlap: 160,
    overlap_all: false,
  }
}

const embed_node = {
  name:"Embedder",
  subtype:"azure_openai",
  type:"embed",
  settings:{
    model_name: "text-embedding-3-large"
  }
}

const workflow_nodes = [
  partition_node,
  image_summarizer_node,
  table_summarizer_node,
  named_entity_recognizer_node,
  chunk_node,
  embed_node
]

// createWorkflow("6c5e3201-800b-4ca5-939e-a3dd76acb444", "da7acb17-7ec9-44f3-957f-7c138e7b82c7");
export async function createWorkflow(source_id:string, destination_id:string) {
  const body = JSON.stringify({
    name:`workflow-${Date.now()}`,
    source_id,
    destination_id,
    workflow_type:"custom",
    workflow_nodes,
    schedule:"monthly"
  });


  const response = await fetch(`${unstructured_api_url}/workflows`, {
    method: 'POST',
    headers,
    body
  })

  if (!response.ok) throw { status: 500, message: "Couldn't create workflow"}
  const data = await response.json() as CreateWorkflowResponse;
  console.log(data)
  return data.id;
}

