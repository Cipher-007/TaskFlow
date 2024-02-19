import { db } from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { userId }: { userId: string } = await request.json();

  const auth = cookies().get(process.env.COOKIE_NAME!);

  if (!auth) {
    return new Response("Unauthorized");
  }

  await db.request.update({
    where: {
      userId,
    },
    data: {
      status: "REJECTED",
    },
  });

  return new Response("Success");
}
