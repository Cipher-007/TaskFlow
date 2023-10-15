import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import type { Project } from "@prisma/client";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { name, id, description, endDate, startDate, priority }: Project =
    await request.json();

  const user = await getUserFromCookie(cookies());

  if (!user) {
    return new Response("Unauthorized");
  }

  if (id) {
    await db.project.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        endDate,
        startDate,
        priority,
      },
    });
  } else {
    await db.project.create({
      data: {
        name,
        description,
        endDate,
        startDate,
        priority,
        organizationId: user!.organizationId!,
        teamId: user!.teamId!,
        permissions: {
          create: {
            userId: user!.id,
            type: "ALL",
          },
        },
      },
    });
  }

  return new Response("Project created", {
    status: 201,
  });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  const user = await getUserFromCookie(cookies());

  if (!user) {
    return new Response("Unauthorized");
  }

  await db.project.delete({
    where: {
      id,
    },
  });

  return new Response("Project deleted", {
    status: 200,
  });
}
