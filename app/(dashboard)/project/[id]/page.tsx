import ListTasks from "@/components/Task/ListTasks";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { cookies } from "next/headers";

type ProjectPageParams = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;

  const data = await db.project.findFirst({
    where: { id },
    select: {
      name: true,
      description: true,
    },
  });

  return {
    title: data?.name,
    description: data?.description,
  };
}

async function getData(id: string) {
  const user = await getUserFromCookie(cookies());
  return await db.project.findFirst({
    where: { id, ownerId: user?.id },
    include: {
      tasks: {
        where: {
          deleted: false,
        },
        orderBy: {
          due: "asc",
        },
      },
    },
  });
}

export default async function ProjectPage({ params }: ProjectPageParams) {
  const project = await getData(params.id);

  return (
    <div className="mx-32 w-full">
      <ListTasks tasks={project!.tasks} title={project!.name} />
    </div>
  );
}
