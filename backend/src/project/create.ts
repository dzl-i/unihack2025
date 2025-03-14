import { createProject } from '../helper/projectHelper';

export async function projectCreate(userId: string, projectName: string) {
  // Generate random code for the project
  const code = generateRandomCode(6);

  const project = await createProject(userId, projectName, code);

  return {
    users: project.users,
    projectId: project.id,
    name: project.name,
    code: project.code,
    isShared: project.isShared,
  };
}

function generateRandomCode(length: number): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return Array.from(
    { length }, 
    () => chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('');
}
