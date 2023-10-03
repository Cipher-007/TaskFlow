import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import type { Task } from "@prisma/client";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import SingleTask from "./SingleTask";

const TaskEditor = dynamic(() => import("./TaskEditor"));

type TaskCardProps = {
  title?: string;
  tasks?: Task[];
};

async function getData() {
  const user = await getUserFromCookie(cookies());
  return await db.task.findMany({
    where: {
      ownerId: user?.id,
      NOT: {
        deleted: true,
      },
    },
    orderBy: {
      due: "asc",
    },
  });
}
export default async function ListTasks({ title, tasks }: TaskCardProps) {
  const data = tasks || (await getData());
  const Status = ["completed", "started", "not_started"];

  return (
    <Card className="max-h-[57rem]">
      {title && (
        <>
          <CardHeader className="items-center pb-2">
            <CardTitle>{title}</CardTitle>
          </CardHeader>
        </>
      )}
      <Tabs defaultValue="completed" className="w-full">
        <TabsList className="mx-auto my-4 grid w-[400px] grid-cols-3">
          {Status.map((status) => (
            <TabsTrigger value={status} key={status.toUpperCase()}>
              {status.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>
        <Separator />
        {Status.map((status) => (
          <TabsContent
            value={status}
            key={status}
            className="max-h[45rem] mt-0"
          >
            <CardContent className="max-h-[44rem] overflow-y-auto pb-0">
              {data && data.length ? (
                data
                  .filter((task) => task.status === status.toUpperCase())
                  .map((task) => <SingleTask task={task} key={task.id} />)
              ) : (
                <div className="w-full text-center text-3xl font-medium">
                  No tasks
                </div>
              )}
            </CardContent>
          </TabsContent>
        ))}
      </Tabs>
      <Separator />
      <CardFooter className="h-20 justify-center pt-2">
        {title && <TaskEditor mode="create" />}
      </CardFooter>
    </Card>
  );
}
