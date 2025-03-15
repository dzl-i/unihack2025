import dotenv from 'dotenv';
import { api_endpoint, headers, token, unstructured_api_url } from './unstructuredClient';

dotenv.config();

export function createDestConnector(collection_name: string, keyspace: string) {
  const body = JSON.stringify({
    name: `astra-dest-abc`,
    type: "astradb",
    config: {token, api_endpoint, collection_name, keyspace}
  });

  fetch(`${unstructured_api_url}/destinations`, {
    method: 'POST',
    headers,
    body
  })
  .then(response => {
    if (!response.ok) {
        return response.text().then(text => { 
        throw new Error(`Request failed with status ${response.status}: ${text}`);
        });
    }
    return response.json(); 
  })
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));
}

// createDestConnector("test", "default_keyspace")