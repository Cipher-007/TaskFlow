import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const data: { name: string; description: string; due: Date } =
    await request.json();

  const cookieStore = cookies();

  const c = cookieStore.get(process.env.COOKIE_NAME!);

  if (!c) {
    return new Response("Unauthorized");
  }

  const user = await validateJWT(c.value);

  await db.project.create({
    data: {
      name: data.name,
      description: data.description,
      owner: { connect: { id: user.id } },
      due: data.due,
    },
  });

  return new Response("Project created", {
    status: 201,
  });
}
