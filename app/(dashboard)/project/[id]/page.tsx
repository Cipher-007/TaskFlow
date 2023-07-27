import TaskCard from "@/components/TaskCard";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

type ProjectPageParams = {
  params: {
    id: string;
  };
};

async function getData(id: string) {
  const user = await getUserFromCookie(cookies() as unknown as RequestCookies);
  return await db.project.findFirst({
    where: { id, ownerId: user?.id },
    include: {
      tasks: true,
    },
  });
}

export default async function ProjectPage({ params }: ProjectPageParams) {
  const project = await getData(params.id);

  return (
    <div className="w-1/1 mx-auto flex h-full max-w-sm items-center overflow-y-auto pr-6">
      <TaskCard tasks={project!.tasks} title={project!.name} />
    </div>
  );
}
