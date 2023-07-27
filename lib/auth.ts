import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { db } from "./db";
import { User } from "@prisma/client";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePasswords(
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
}

export function createJWT(user: Partial<User>) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;

  return new SignJWT({ payload: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
}

export async function validateJWT(jwt: string) {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET),
  );

  return payload.payload as Partial<User>;
}

export async function getUserFromCookie(cookies: RequestCookies) {
  const jwt = cookies.get(process.env.COOKIE_NAME as string);

  const { id } = await validateJWT(jwt?.value as string);

  const user = await db.user.findUnique({
    where: {
      id: id as string,
    },
  });

  return user;
}
