import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { db } from "./db";
import type { User } from "@prisma/client";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
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

  return new SignJWT({
    payload: {
      id: user.id,
      email: user.email,
      organizationId: user.organizationId,
      teamId: user.teamId,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
  })
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

export async function getUserFromCookie(cookies: ReadonlyRequestCookies) {
  const jwt = cookies.get(process.env.COOKIE_NAME!);

  if (!jwt) {
    return null;
  }

  const { id } = await validateJWT(jwt!.value);

  const user = await db.user.findUnique({
    where: {
      id: id as string,
    },
  });

  return user;
}

export async function isApproved(cookies: ReadonlyRequestCookies) {
  const user = await validateJWT(cookies.get(process.env.COOKIE_NAME!)?.value!);
  const access = await db.request.findUnique({
    where: {
      userId: user?.id,
    },
    select: {
      status: true,
    },
  });

  return access?.status !== "PENDING" ? true : false;
}

export async function isAdmin(cookies: ReadonlyRequestCookies) {
  const user = await validateJWT(cookies.get(process.env.COOKIE_NAME!)?.value!);
  const admin = await db.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      role: true,
    },
  });

  return admin?.role === "ORGANIZATION_ADMIN" ? true : false;
}
