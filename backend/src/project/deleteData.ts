import { DeleteObjectCommand, waitUntilObjectNotExists } from "@aws-sdk/client-s3";
import { deleteDataSource, getDataSourceById } from "../helper/dataHelper";
import s3Client from "../helper/s3Client";

export async function projectDeleteDataSource(userId: string, dataSourceId: string) {
  const dataSource = await getDataSourceById(dataSourceId);
  if (dataSource === null) throw { status: 400, message: "No data source found." };

  const userIds = dataSource.project.users.map((user) => user.id);
  if (!userIds.includes(userId)) throw { status: 403, message: "You do not have access to this data source." };

  const data = await deleteDataSource(dataSourceId);
  if (data === null) throw { status: 400, message: "Failed to delete data source." };

  try {
    await s3Client.send(new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET!,
      Key: dataSource.url,
    }));

    await waitUntilObjectNotExists(
      { client: s3Client, maxWaitTime: 10 },
      { Bucket: process.env.AWS_BUCKET!, Key: dataSource.url }
    );
  } catch (err) {
    console.error(err)
    throw {
      status: 500,
      message: "An error occured while deleting from S3: " + err,
    };
  }

  // TODO: Delete the data from AstraDB

  return {
    id: data.id,
    name: data.name,
  };
}
