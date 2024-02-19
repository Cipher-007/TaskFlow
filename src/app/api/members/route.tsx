import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const data: { id: string; toggle: boolean; teamId: string }[] =
    await req.json();

  const user = await getUserFromCookie(cookies());

  if (!user) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  data.forEach(async (member) => {
    if (member.toggle) {
      await db.team.update({
        where: {
          id: member.teamId,
        },
        data: {
          members: {
            connect: {
              id: member.id,
            },
          },
        },
      });
    } else {
      await db.team.update({
        where: {
          id: member.teamId,
        },
        data: {
          members: {
            disconnect: {
              id: member.id,
            },
          },
        },
      });
    }
  });

  return new Response("Team Updated", {
    status: 201,
  });
}
