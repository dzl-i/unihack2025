import { getUserById } from "../helper/userHelper";

export async function userProfile(userId: string) {
  // Prisma Queries
  const user = await getUserById(userId);

  if (user === null) throw { status: 400, message: "User does not exist." };

  return {
    userId: user.id,
    name: user.name,
    email: user.email,
    profilePic: user.profilePic,
  };
} 