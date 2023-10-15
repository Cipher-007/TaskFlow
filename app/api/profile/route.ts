import { comparePasswords, getUserFromCookie, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProfileFormValues } from "@/lib/zod";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const data: ProfileFormValues = await req.json();

  const user = await getUserFromCookie(cookies());

  if (!user) {
    console.log("Unauthorized");

    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const { new_password, ...body } = data;

  const password = await db.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      password: true,
    },
  });

  const isUser = await comparePasswords(body.password, password!.password);

  if (!isUser) {
    return NextResponse.json(
      { message: "Incorrect Password" },
      { status: 401 },
    );
  }

  await db.user.update({
    where: {
      id: user?.id,
    },
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: await hashPassword(new_password),
    },
  });

  return NextResponse.json({ message: "Task updated" }, { status: 200 });
}
