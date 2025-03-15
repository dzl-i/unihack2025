import dotenv from 'dotenv';
import { api_endpoint, headers, token, unstructured_api_url } from './unstructuredClient';

interface DestConnectorInfo {
  id: string;
}

interface CreateDestResponse {
  destination_connector_information: DestConnectorInfo;
}

dotenv.config();

// createDestConnector("test", "default_keyspace")
export async function createDestConnector(collection_name: string, keyspace: string): Promise<string> {
  const body = JSON.stringify({
    name: collection_name,
    type: "astradb",
    config: { token, api_endpoint, collection_name, keyspace }
  });

  try {
    const response = await fetch(`${unstructured_api_url}/destinations`, {
      method: 'POST',
      headers,
      body
    });

    if (!response.ok) throw { status: 500, message: "Couldn't create dest connector"}
    const data = await response.json() as CreateDestResponse;
    return data.destination_connector_information.id;

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
