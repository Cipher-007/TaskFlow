import { comparePasswords, createJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { serialize } from "cookie";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return new Response("Invalid login", {
      status: 401,
    });
  }

  const isUser = await comparePasswords(password, user.password);

  if (isUser) {
    const jwt = await createJWT(user);

    return new Response("Sign in successful", {
      status: 201,
      headers: {
        "Set-Cookie": serialize(process.env.COOKIE_NAME!, jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "strict",
        }),
      },
    });
  } else {
    return new Response("Invalid login", {
      status: 401,
    });
  }
}
