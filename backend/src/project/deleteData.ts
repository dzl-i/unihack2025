import { deleteDataSource, getDataSourceById } from "../helper/dataHelper";

export async function projectDeleteDataSource(userId: string, dataSourceId: string) {
  const dataSource = await getDataSourceById(dataSourceId);
  if (dataSource === null) throw { status: 400, message: "No data source found." };

  const userIds = dataSource.project.users.map((user) => user.id);
  if (!userIds.includes(userId)) throw { status: 403, message: "You do not have access to this data source." };

  const data = await deleteDataSource(dataSourceId);
  if (data === null) throw { status: 400, message: "Failed to delete data source." };

  // TODO: Delete the file from S3 using dataSource.url

  // TODO: Delete the data from AstraDB

  return {
    id: data.id,
    name: data.name,
  };
}
