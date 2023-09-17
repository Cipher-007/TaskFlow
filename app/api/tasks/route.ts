import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import type { Task } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, description, status, projectId, due }: Task = await req.json();

  const cookieStore = cookies();

  const c = cookieStore.get(process.env.COOKIE_NAME!);

  if (!c) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const { id } = await validateJWT(c.value);

  await db.task.create({
    data: {
      name: name,
      description: description,
      due: due,
      project: { connect: { id: projectId } },
      status: status,
      owner: { connect: { id } },
    },
  });

  return new Response("Task created", {
    status: 201,
  });
}

export async function PUT(req: Request) {
  const data: Task = await req.json();

  const cookieStore = cookies();

  const c = cookieStore.get(process.env.COOKIE_NAME!);

  if (!c) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const user = await validateJWT(c!.value);

  const { id, ...body } = data;

  await db.task.update({
    where: {
      id: id as string,
    },
    data: body,
  });

  return NextResponse.json({ message: "Task updated" }, { status: 200 });
}
