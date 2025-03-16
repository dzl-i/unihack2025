import dotenv from 'dotenv';
dotenv.config();

// env secrets
const unstructured_api_key = process.env.UNSTRUCTURED_API_KEY!;
const unstructured_dest_connector_id = process.env.UNSTRUCTURED_DEST_CONNECTOR_ID!;
const token = process.env.ASTRA_APP_TOKEN!;
const api_endpoint = process.env.ASTRA_API_ENDPOINT!;
const astra_collection = process.env.ASTRA_COLLECTION!;
const astra_keyspace = process.env.ASTRA_KEYSPACE!;

// constants
const astra_dest_name = "astra-dest-main"
const unstructured_api_url = "https://platform.unstructuredapp.io/api/v1"
const headers = {
    "accept": "application/json",
    "unstructured-api-key": unstructured_api_key,
    "content-type": "application/json",
  };

export {
  unstructured_api_url,
  unstructured_dest_connector_id,
  token,
  astra_collection,
  astra_keyspace,
  astra_dest_name,
  unstructured_api_key, 
  api_endpoint, 
  headers
}