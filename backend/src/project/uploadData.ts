import { PutObjectCommand } from "@aws-sdk/client-s3";
import { uploadDataSource } from "../helper/dataHelper";
import { getProjectById } from "../helper/projectHelper";
import { s3Client, bucketName } from "../helper/s3Client";

export async function projectUploadDataSource(userId: string, projectId: string, file: Express.Multer.File | undefined) {
  if (!file) throw { status: 400, message: "No file provided." }
  const project = await getProjectById(projectId);
  if (project === null) throw { status: 404, message: "Project not found." };

  const userIds = project.users.map((user) => user.userId);
  if (!userIds.includes(userId)) throw { status: 403, message: "You do not have access to this project." };
  const { buffer, originalname, mimetype } = file;

  // we can just store the key (path) to the file, S3client automatically handles the url stuff
  const key = `${projectId}/${originalname}`
  try {
    await s3Client.send(new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: mimetype,
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
  // createSourceConnector()
  // createDestConnector()
  // createWorkflow()
  // workflow.run()

  const data = await uploadDataSource(projectId, originalname);
  if (data === null) throw { status: 400, message: "Failed to upload data source." };

  return {
    id: data.id,
    name: data.name,
    projectName: project.name,
  }
}
