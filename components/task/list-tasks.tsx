import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import type { Task } from "@prisma/client";
import { cookies } from "next/headers";
import { Separator } from "../ui/separator";
import SingleTask from "./single-tasks";

type TaskCardProps = {
  tasks?: Task[];
};

async function getData(id: string) {
  return await db.task.findMany({
    where: {
      teamId: id,
      deleted: false,
    },
  });
}
export default async function ListTasks({ tasks }: TaskCardProps) {
  let data: Task[];

  if (tasks) {
    data = tasks;
  } else {
    const user = await getUserFromCookie(cookies());

    if (!user?.teamId) {
      return null;
    }

    data = await getData(user.teamId!);
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
    <div className="max-h-[57rem] w-full rounded-md bg-white py-2 dark:bg-black">
      {data && data.length > 0 ? (
        <Tabs defaultValue="TODO" className="w-full">
          <TabsList className="mx-auto my-2 grid w-1/2 grid-cols-6">
            {Status.map((status) => (
              <TabsTrigger value={status} key={status}>
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
                  <div className="w-full p-8 text-center text-3xl font-medium">
                    0 {status} tasks
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className="flex h-80 w-full items-center justify-center text-3xl font-medium">
          No tasks
        </div>
      )}
    </div>
  );
}
