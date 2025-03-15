import dotenv from 'dotenv';
dotenv.config();

// env secrets
const unstructured_api_key = process.env.UNSTRUCTURED_API_KEY!;
const token = process.env.ASTRA_APP_TOKEN!;
const api_endpoint = process.env.ASTRA_API_ENDPOINT!;


// constants
const unstructured_api_url = "https://platform.unstructuredapp.io/api/v1"
const headers = {
    "accept": "application/json",
    "unstructured-api-key": unstructured_api_key,
    "content-type": "application/json",
  };

export function sanityCheck() {
  console.log(unstructured_api_key, token, api_endpoint)
}

export {unstructured_api_url, unstructured_api_key, token, api_endpoint, headers}