import crypto from "crypto";

export function getHash(plaintext: string) {
  return crypto.createHash("sha256").update(plaintext).digest("hex");
}