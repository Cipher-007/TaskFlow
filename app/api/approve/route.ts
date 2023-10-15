import { db } from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const data: { teamId: string; userId: string } = await request.json();

  const auth = cookies().get(process.env.COOKIE_NAME!);

  if (!auth) {
    return new Response("Unauthorized");
  }

  const user = await db.user.update({
    where: {
      id: data.userId,
    },
    data: {
      team: {
        connect: {
          id: data.teamId,
        },
      },
      Request: {
        update: {
          where: {
            userId: data.userId,
          },
          data: {
            status: "APPROVED",
          },
        },
      },
    },
  });

  return new Response(JSON.stringify(user));
}
