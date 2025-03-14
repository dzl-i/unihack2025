import { generateToken } from "../helper/tokenHelper";
import { checkBlockedAccount, checkEmailExists, verifyLogin } from "../helper/authHelper";
import { getUserByEmail } from "../helper/userHelper";

export async function authLogin(email: string, password: string) {
  // Error Handling
  if (await checkBlockedAccount(email)) throw { status: 400, message: "You have entered an incorrect password for three times, so the account has been blocked. Please reset your password." };
  if (! await checkEmailExists(email)) throw { status: 400, message: "Email does not exist." };
  if (! await verifyLogin(email, password)) throw { status: 400, message: "Password is not correct." };

  // Get Researcher
  const user = await getUserByEmail(email);
  if (user === null) throw { status: 400, message: "Email does not exist." };
  const { accessToken, refreshToken } = await generateToken(user.id);

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    userId: user.id,
    name: user.name,
    email: user.email,
    profilePic: user.profilePic,
  };
}