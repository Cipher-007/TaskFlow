import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { Prisma, TASK_STATUS } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data: {
    name: string;
    description: string;
    due: string;
    projectId: string;
    status: TASK_STATUS;
  } = await req.json();

  const cookieStore = cookies();

  const c = cookieStore.get(process.env.COOKIE_NAME! as string);

  if (!c) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const user = await validateJWT(c.value);

  await db.task.create({
    data: {
      name: data.name,
      description: data.description,
      due: data.due,
      project: { connect: { id: data.projectId } },
      status: data.status,
      owner: { connect: { id: user.id } },
    },
  });

  return new Response("Task created", {
    status: 201,
  });
}

export async function PUT(req: Request) {
  const data: Prisma.TaskUpdateInput = await req.json();

  const cookieStore = cookies();

  const c = cookieStore.get(process.env.COOKIE_NAME! as string);

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
