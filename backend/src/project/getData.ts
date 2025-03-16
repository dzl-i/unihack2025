import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, bucketName } from "../helper/s3Client.js";
import { getDataSourceById } from "../helper/dataHelper.js";

export async function projectGetData(dataSourceId: string) {
  const dataSource = await getDataSourceById(dataSourceId);
  if (dataSource === null) throw { status: 404, message: "No data source found." };

  const command = new GetObjectCommand({ Bucket: bucketName, Key: `${dataSource.projectId}/${dataSource.name}` });
  return getSignedUrl(s3Client, command, { expiresIn: 3600 });
}
