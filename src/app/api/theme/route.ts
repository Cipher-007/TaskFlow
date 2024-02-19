import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { Theme } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const theme: Theme = await request.json();

  const user = await getUserFromCookie(cookies());

  if (!user) {
    return new Response("Unauthorized");
  }

  try {
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        theme: theme,
      },
    });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ message: "Theme updated" }, { status: 201 });
}
