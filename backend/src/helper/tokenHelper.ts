import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import "dotenv/config";
import crypto from "crypto";

import { getHash } from "./util";
import { getUserByEmail } from "./userHelper";

const prisma = new PrismaClient();

export async function generateToken(id: string) {
  // Create the token based on the user's id and/or a random uuid
  const accessToken: string = jwt.sign({ uuid: crypto.randomUUID(), userId: id }, process.env.ACCESS_JWT_SECRET as string, {
    expiresIn: "30m"
  });

  const refreshToken: string = jwt.sign({ uuid: crypto.randomUUID(), userId: id }, process.env.REFRESH_JWT_SECRET as string, {
    expiresIn: "90d"
  });

  // Add the token to the database
  await prisma.token.create({
    data: {
      accessToken: getHash(accessToken),
      refreshToken: getHash(refreshToken),
      userId: id,
    }
  }).catch(e => { console.error(e.message) });

  return {
    accessToken: accessToken,
    refreshToken: refreshToken
  };
}

export async function deleteToken(refreshToken: string) {
  return await prisma.token.delete({
    where: {
      refreshToken: getHash(refreshToken)
    }
  })
}

export async function deleteTokenFromEmail(email: string) {
  const user = await getUserByEmail(email);

  if (user === null) return null;

  return await prisma.token.deleteMany({
    where: {
      user: user
    }
  })
}

export async function checkValidToken(refreshToken: string) {
  const res = await prisma.token.findFirst({
    where: {
      refreshToken: getHash(refreshToken)
    }
  })

  if (res === null) return false; else return true;
}

export async function getUserFromToken(refreshToken: string) {
  const res = await prisma.token.findFirst({
    where: {
      refreshToken: getHash(refreshToken)
    },
    select: {
      user: true
    }
  });

  if (res === null) return null; else return res.user;
}