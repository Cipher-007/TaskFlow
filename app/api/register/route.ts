import { createJWT, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import type { User } from "@prisma/client";
import { serialize } from "cookie";

export async function POST(request: Request) {
  const { email, password, firstName, lastName }: User = await request.json();

  let user;
  try {
    user = await db.user.create({
      data: {
        email: email,
        password: await hashPassword(password),
        firstName: firstName,
        lastName: lastName,
      },
    });
  } catch (error) {
    return new Response(`${error}`, {
      status: 409,
    });
  }

  const jwt = await createJWT(user);

  return new Response(null, {
    status: 201,
    headers: {
      "Set-Cookie": serialize(process.env.COOKIE_NAME!, jwt, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      }),
    },
  });
}
