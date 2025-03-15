import { PutObjectCommand } from "@aws-sdk/client-s3";
import { uploadDataSource } from "../helper/dataHelper";
import { getProjectById } from "../helper/projectHelper";
import { s3Client, bucketName } from "../helper/s3Client";

export async function projectUploadDataSource(userId: string, projectId: string, fileBuffer: Buffer | undefined, fileName: string | undefined, fileType: string | undefined) {
  if (!fileBuffer || !fileName || !fileType) throw { status: 400, message: "No file provided." }
  const project = await getProjectById(projectId);
  if (project === null) throw { status: 404, message: "Project not found." };

  const userIds = project.users.map((user) => user.userId);
  if (!userIds.includes(userId)) throw { status: 403, message: "You do not have access to this project." };

  // we can just store the key (path) to the file, S3client automatically handles the url stuff
  const key = `${projectId}/${fileName}`
  try {
    await s3Client.send(new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: fileBuffer,
      ContentType: fileType,
      Metadata: {
        projectId,
      }
    })
    )
  } catch (err) {
    throw {
      status: 500,
      message: "An error occurred while uploading to S3: " + err,
    };
  }

  // TODO: Upload the file to Unstructured and retrieve the processed data

  // TODO: Upload the processed data to AstraDB

  const data = await uploadDataSource(projectId, fileName, key);
  if (data === null) throw { status: 400, message: "Failed to upload data source." };

  return {
    id: data.id,
    name: data.name,
    url: data.url,
    projectName: project.name,
  }
}
