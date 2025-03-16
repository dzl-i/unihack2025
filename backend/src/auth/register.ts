import validator from 'validator';

import { checkEmailExists } from '../helper/authHelper.js';
import { generateToken } from '../helper/tokenHelper.js';
import { getHash } from '../helper/util.js';

import { PrismaClient } from "@prisma/client";
import { projectCreate } from '../project/create.js';
const prisma = new PrismaClient();

export async function authRegister(name: string, email: string, password: string, username: string, profilePic: string) {
  // Error Handling
  if (name.length < 1) throw { status: 400, message: "Name cannot be empty." };
  if (!validator.isEmail(email)) throw { status: 400, message: "Invalid email address." };
  if (await checkEmailExists(email)) throw { status: 400, message: "Email address is already being used by another user." };

  // Create the user
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: getHash(password),
      profilePic: profilePic,
    }
  });

  // Create a personal project
  const project = await projectCreate(user.id, "Personal");
  if (project === null) throw { status: 400, message: "Failed to create personal project." };

  // Generate the token
  const token = await generateToken(user.id);

  return {
    accessToken: token.accessToken,
    refreshToken: token.refreshToken,
    userId: user.id,
    name: user.name,
    email: user.email,
    profilePic: user.profilePic,
  };
}