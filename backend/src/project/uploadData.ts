import { uploadDataSource } from "../helper/dataHelper";
import { getProjectById } from "../helper/projectHelper";

export async function projectUploadDataSource(userId: string, projectId: string, fileBuffer: Buffer | undefined, fileName: string | undefined) {
  if (!fileBuffer || !fileName) throw { status: 400, message: "No file provided." }
  const project = await getProjectById(projectId);
  if (project === null) throw { status: 404, message: "Project not found." };

  const userIds = project.users.map((user) => user.userId);
  if (!userIds.includes(userId)) throw { status: 403, message: "You do not have access to this project." };

  const url = "http://localhost:3000/" + fileName; // TODO: Upload the file to S3 and get the URL

  // TODO: Upload the file to Unstructured and retrieve the processed data

  // TODO: Upload the processed data to AstraDB

  const data = await uploadDataSource(projectId, fileName, url);
  if (data === null) throw { status: 400, message: "Failed to upload data source." };

  return {
    id: data.id,
    name: data.name,
    url: data.url,
    projectName: project.name,
  }
}
