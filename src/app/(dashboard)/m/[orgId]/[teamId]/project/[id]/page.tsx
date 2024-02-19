import { type Metadata } from "next";
import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/server";
import AccessDeniedComponent from "../../../_components/access-denied-component";
import { DataTable } from "../_components/task-table/data-table";
import { columns } from "../_components/task-table/columns";
import TaskEditor from "~/components/task/task-editor";
import EditProject from "../../../_components/project/edit-project";
import ShowComments from "../_components/comment/show-comments";
import ListComment from "../_components/comment/list-comments";

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

  const data = await api.project.getById.query({ id: id });

  return {
    title: data?.name,
    description: data?.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageParams) {
  const access = await api.user.isApproved.query();

  if (access) {
    const project = await api.project.getById.query({ id: params.id });
    const tasksdata = await api.task.getAllByProject.query({
      projectId: params.id,
    });

    const tasks = tasksdata.map((task) => {
      return {
        id: task.id,
        name: task.name,
        description: task.description,
        startDate: task.startDate,
        endDate: task.endDate,
        priority: task.priority,
        status: task.status,
      };
    });

    if (!project) {
      return (
        <div className="mx-32 w-full text-center text-3xl font-medium">
          Project not found
        </div>
      );
    }

    return (
      <div className="flex h-full w-full flex-col justify-center gap-4 p-4">
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
          <div className="p-4">
            <DataTable columns={columns} data={tasks} />
          </div>
          <div className="flex justify-center pb-4">
            <TaskEditor mode="create" />
          </div>
        </div>
        <ShowComments>
          <ListComment projectId={params.id} />
        </ShowComments>
      </div>
    );
  }

  return <AccessDeniedComponent />;
}
