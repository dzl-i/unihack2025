import dotenv from 'dotenv';
import { unstructured_api_url, headers } from './unstructuredClient';

dotenv.config();
const bucket = process.env.AWS_BUCKET!;
const aws_access_key = process.env.AWS_ACCESS_KEY!;
const aws_secret_access_key = process.env.AWS_SECRET_ACCESS_KEY!;

export function createSourceConnector(inputPath:string) {
  const body = JSON.stringify({
    name: `s3-source-${inputPath}`,
    type: "s3",
    config: {
      remote_url:`s3://${bucket}/${inputPath}`,
      key:aws_access_key,
      secret:aws_secret_access_key,
      recursive: true,
    },
  });

  fetch(`${unstructured_api_url}/sources`, {
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