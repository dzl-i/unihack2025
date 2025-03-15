import { PutObjectCommand, S3ServiceException } from "@aws-sdk/client-s3";
import { uploadDataSource } from "../helper/dataHelper";
import { getProjectById } from "../helper/projectHelper";
import s3Client from "../helper/s3Client";

export async function projectUploadDataSource(userId: string, projectId: string, fileBuffer: Buffer | undefined, fileName: string | undefined, fileType: string | undefined) {
  if (!fileBuffer || !fileName || !fileType) throw { status: 400, message: "No file provided." }
  const project = await getProjectById(projectId);
  if (project === null) throw { status: 404, message: "Project not found." };

  const userIds = project.users.map((user) => user.userId);
  if (!userIds.includes(userId)) throw { status: 403, message: "You do not have access to this project." };

  const key = "input/" + fileName;

  const putCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET!,
    Key: key,
    Body: fileBuffer,
    ContentType: fileType,
    Metadata: {
      projectId,
    }
  })

  try {
    await s3Client.send(putCommand)
  } catch (err) {
    // I hate this exception handling code and I should probs put in another fn but we ball
    if (err instanceof S3ServiceException) {
      if (err.name === "EntityTooLarge") {
        throw {
          status: 413,
          message: `The object is too large. To up.`,
        };
      }
      throw {
        status: 500,
        message: `S3 upload error: ${err.name} - ${err.message}`,
      };
    }
    throw {
      status: 500,
      message: "An unknown error occurred while uploading to S3.",
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
