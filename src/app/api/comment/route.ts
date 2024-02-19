import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import type { Comment } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const data: Comment = await request.json();

  const cookieStore = cookies();

  const c = cookieStore.get(process.env.COOKIE_NAME!);

  if (!c) {
    return new Response("Unauthorized");
  }

  const user = await getUserFromCookie(cookies());

  await db.comment.create({
    data: {
      content: data.content,
      projectId: data.projectId,
      userId: user!.id,
    },
  });

  revalidatePath(`/project/${data.projectId}}`);

  return new Response("Project created", {
    status: 201,
  });
}
