import dotenv from 'dotenv';
import { unstructured_api_url, headers } from './unstructured.js';

interface CreateSourceResponse {
  id: string;
}

dotenv.config();
const bucket = process.env.AWS_BUCKET!;
const aws_access_key = process.env.AWS_ACCESS_KEY!;
const aws_secret_access_key = process.env.AWS_SECRET_ACCESS_KEY!;

export async function createSourceConnector(inputPath:string): Promise<string> {
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

  const response = await fetch(`${unstructured_api_url}/sources`, {
    method: 'POST',
    headers,
    body
  })

  if (!response.ok) throw { status: 500, message: "Couldn't create source connector"}
  const data = await response.json() as CreateSourceResponse;
  console.log(data)
  return data.id;

}