import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import type { Task } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, description, status, projectId, endDate }: Task =
    await req.json();

  const user = await getUserFromCookie(cookies());

  if (!user) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  await db.task.create({
    data: {
      name: name,
      description: description,
      endDate: endDate,
      projectId: projectId,
      status: status,
      organizationId: user.organizationId!,
      teamId: user?.teamId!,
      startDate: new Date(),
      permissions: {
        createMany: {
          data: [
            {
              userId: user.id!,
              type: "ALL",
            },
          ],
        },
      },
    },
  });

  revalidatePath(`/project/${projectId}}`);

  return new Response("Task created", {
    status: 201,
  });
}

export async function PUT(req: Request) {
  const data: Task = await req.json();

  const user = await getUserFromCookie(cookies());

  if (!user) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const { id, ...body } = data;

  await db.task.update({
    where: {
      id: id,
    },
    data: body,
  });

  revalidatePath(`/project/${body.projectId}}`);

  return NextResponse.json({ message: "Task updated" }, { status: 200 });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const user = await getUserFromCookie(cookies());

  if (!user) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  await db.task.update({
    where: {
      id: id,
    },
    data: {
      deleted: true,
    },
  });

  return new Response("Task deleted", {
    status: 200,
  });
}
