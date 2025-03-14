import jwt from "jsonwebtoken";

import { checkValidToken, deleteToken, getUserFromToken } from "../helper/tokenHelper";

export async function authLogout(refreshToken: string) {
  // Check if the refresh token exists in the database
  if (! await checkValidToken(refreshToken)) throw { status: 401, message: "Refresh token does not exist." };

  // Verify the refresh token
  jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET as string, (err) => {
    if (err) throw { status: 403, message: "Refresh token is not valid or have expired." };
  });

  // Get the user from the token
  const user = await getUserFromToken(refreshToken);
  if (user === null) throw { status: 403, message: "Refresh token is not valid or have expired." };

  // Delete the user's token
  await deleteToken(refreshToken);

  return;
}