import { db } from "@/lib/db";
import type { User } from "@prisma/client";

export async function POST(request: Request) {
  const { id, teamId }: User = await request.json();

  await db.user.update({
    where: { id },
    data: {
      teamId,
    },
  });

  return new Response("POST /user", { status: 200 });
}

export async function DELETE(request: Request) {
  const { id }: { id: string } = await request.json();

  await db.user.update({
    where: { id },
    data: {
      Request: {
        update: {
          where: { userId: id },
          data: {
            status: "REJECTED",
          },
        },
      },
    },
  });

  return new Response("DELETE /user", { status: 200 });
}
