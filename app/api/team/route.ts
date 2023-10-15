import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import type { Team } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { id, name, description }: Team = await req.json();

  const user = await getUserFromCookie(cookies());

  if (!user) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  if (id) {
    await db.team.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });
  } else {
    await db.team.create({
      data: {
        name,
        description,
        organizationId: user.organizationId,
      },
    });
  }

  return new Response("Team created", {
    status: 201,
  });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  const user = await getUserFromCookie(cookies());

  if (!user) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  await db.team.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/teams");

  return new Response("Team deleted", {
    status: 200,
  });
}
