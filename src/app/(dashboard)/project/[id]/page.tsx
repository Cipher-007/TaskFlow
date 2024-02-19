import AccessDeniedComponent from "@/components/access-denied-component";
import ListComment from "@/components/comment/list-comments";
import EditProject from "@/components/project/edit-project";
import ListTasks from "@/components/task/list-tasks";
import TaskEditor from "@/components/task/task-editor";
import { Separator } from "@/components/ui/separator";
import { getUserFromCookie, isApproved } from "@/lib/auth";
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
    where: {
      teamId: user?.teamId!,
      id,
    },
    include: {
      tasks: {
        where: {
          permissions: {
            some: {
              userId: user?.id,
              NOT: {
                type: "NONE",
              },
            },
          },
        },
      },
    },
  });
}

export default async function ProjectPage({ params }: ProjectPageParams) {
  const access = await isApproved(cookies());

  if (access) {
    const project = await getData(params.id);

    if (!project) {
      return (
        <div className="mx-32 w-full text-center text-3xl font-medium">
          Project not found
        </div>
      );
    }

    return (
      <div className="ml-4 flex w-full items-center justify-between gap-4">
        <div className="w-full rounded-md bg-white dark:bg-black">
          <div className="flex items-center justify-between">
            <h3 className="flex basis-[100%] justify-center pl-10 pt-4 text-3xl font-medium">
              {project.name}
            </h3>
            <div className="p-4">
              <EditProject project={project} />
            </div>
          </div>
          <Separator />
          <ListTasks tasks={project!.tasks} />
          <div className="flex justify-center pb-4">
            <TaskEditor mode="create" />
          </div>
        </div>
        <ListComment projectId={params.id} />
      </div>
    );
  }

  return <AccessDeniedComponent />;
}
