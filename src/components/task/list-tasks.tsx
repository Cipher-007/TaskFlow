import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { type Task } from "~/server/db/schema";
import { api } from "~/trpc/server";
import SingleTask from "./single-tasks";

type TaskCardProps = {
  tasks?: Task[];
  teamId?: string;
};

export default async function ListTasks({ tasks, teamId }: TaskCardProps) {
  let data: Task[];

  if (tasks) {
    data = tasks;
  } else {
    data = await api.task.getAll();
  }

  const Status = [
    "TODO",
    "IN_PROGRESS",
    "ON_HOLD",
    "DONE",
    "CANCELED",
    "BACKLOG",
  ];

  return (
    <>
      {data && data.length > 0 ? (
        <div className="max-h-[57rem] w-full rounded-md bg-white py-2 dark:bg-black">
          <Tabs defaultValue="TODO" className="w-full">
            <TabsList className="mx-auto my-2 grid w-[90%] grid-cols-6 lg:w-3/4">
              {Status.map((status) => (
                <TabsTrigger
                  value={status}
                  key={status}
                  className="text-xs md:text-sm"
                >
                  {status}
                </TabsTrigger>
              ))}
            </TabsList>
            {Status.map((status) => (
              <TabsContent
                value={status}
                key={status}
                className="max-h[45rem] mt-0"
              >
                <div className="max-h-[44rem] overflow-y-auto pb-0">
                  {data.filter((task) => task.status === status).length > 0 ? (
                    data
                      .filter((task) => task.status === status)
                      .map((task) => <SingleTask task={task} key={task.id} />)
                  ) : (
                    <div className="w-full p-8 text-center text-2xl font-medium">
                      0 {status} tasks
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      ) : teamId ? null : (
        <div className="flex h-80 w-full items-center justify-center text-3xl font-medium">
          No tasks
        </div>
      )}
    </>
  );
}
