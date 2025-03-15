import { api_endpoint, astra_collection, astra_dest_name, astra_keyspace, headers, token, unstructured_api_url } from './unstructured';

interface CreateDestResponse {
  id: string;
}

// collection_name can only contain characters
// func is not generally used when creating workflows because all data is in one collection (we are broke)
export async function createDestConnector(collection_name: string, keyspace: string): Promise<string> {
  const body = JSON.stringify({
    name: astra_dest_name,
    type: "astradb",
    config: { 
      token,
      api_endpoint, 
      collection_name: astra_collection, 
      keyspace: astra_keyspace 
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
