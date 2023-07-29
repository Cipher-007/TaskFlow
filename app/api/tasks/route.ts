import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { TASK_STATUS } from "@prisma/client";
import { cookies } from "next/headers";

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
    return new Response("Unauthorized");
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
