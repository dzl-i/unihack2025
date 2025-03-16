import { getHash } from "./util.js";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function checkEmailExists(email: string): Promise<boolean> {
  const res = await prisma.user.findFirst({
    where: {
      email: email
    }
  }).catch(e => { console.error(e.message) })

  if (res === null) return false; else return true;
}

export async function verifyLogin(email: string, password: string): Promise<boolean> {
  const user = await prisma.user.findFirst({
    where: {
      email: email
    }
  });

  if (user === null) return false;

  // If password is correct, reset the remainingLoginAttempts to 5
  // If the password is incorrect, subtract the remainingLoginAttempts by 1
  if (user.password === getHash(password)) {
    await prisma.user.update({
      where: {
        email: email
      },
      data: {
        remainingLoginAttempts: 5
      }
    });

    return true;
  } else {
    await prisma.user.update({
      where: {
        email: email
      },
      data: {
        remainingLoginAttempts: {
          decrement: 1
        }
      }
    });

    return false;
  }
}

export async function checkBlockedAccount(email: string): Promise<boolean> {
  const user = await prisma.user.findFirst({
    where: {
      email: email
    }
  });

  if (user === null) return false;

  if (user.remainingLoginAttempts === 0) return true; else return false;
}