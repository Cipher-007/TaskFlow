import { createJWT, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { serialize } from "cookie";

type User = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export async function POST(request: Request) {
  const { email, password, firstName, lastName }: User = await request.json();

  const user = await db.user.create({
    data: {
      email: email,
      password: await hashPassword(password),
      firstName: firstName,
      lastName: lastName,
    },
  });

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
