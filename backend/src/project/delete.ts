import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { deleteProject, detailProject } from "../helper/projectHelper";
import { s3Client, bucketName } from "../helper/s3Client";

export async function projectDelete(userId: string, projectId: string) {
  const project = await detailProject(projectId);
  if (project === null) throw { status: 404, message: "Project does not exist." };

  const userIds = project.users.map((user) => user.userId);
  if (!userIds.includes(userId)) throw { status: 403, message: "You do not have access to this project." };

  const dataSourcesToDelete = project.dataSources.map((dataSource) => ({ Key: `${projectId}/${dataSource.name}` }))
  const deletedProject = await deleteProject(projectId);

  if (dataSourcesToDelete.length > 0) {
    await s3Client.send(new DeleteObjectsCommand({
      Bucket: bucketName,
      Delete: {
        Objects: dataSourcesToDelete
      }
    }))
  }

  return {
    id: deletedProject.id,
    name: deletedProject.name,
  };
}
