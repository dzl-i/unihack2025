import { api_endpoint, headers, token, unstructured_api_url } from './unstructured';

interface CreateDestResponse {
  id: string;
}

// collection_name can only contain characters
export async function createDestConnector(collection_name: string, keyspace: string): Promise<string> {
  const body = JSON.stringify({
    name: `astradb-dest-abc`,
    type: "astradb",
    config: { 
      token,
      api_endpoint, 
      collection_name:"test", 
      keyspace 
    }
  });

  const response = await fetch(`${unstructured_api_url}/destinations`, {
    method: 'POST',
    headers,
    body
  });

  if (!response.ok) throw { status: 500, message: "Couldn't create dest connector"}
  const data = await response.json() as CreateDestResponse;
  console.log(data)
  return data.id;

}
