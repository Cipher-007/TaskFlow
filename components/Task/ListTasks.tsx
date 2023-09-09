import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { TASK_STATUS } from "@/lib/types";
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
        status: TASK_STATUS.COMPLETED,
        deleted: false,
      },
    },
    take: 5,
    orderBy: {
      due: "asc",
    },
  });
}
export default async function ListTasks({ title, tasks }: TaskCardProps) {
  const data = tasks || (await getData());

  return (
    <Card>
      {title && (
        <>
          <CardHeader className="items-center">
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <Separator />
        </>
      )}
      <CardContent className="max-h-[46rem] overflow-y-auto">
        {data && data.length ? (
          <>
            {data.map((task) => (
              <SingleTask task={task} key={task.id} />
            ))}
          </>
        ) : (
          <div className="w-full text-center text-3xl font-medium">
            No tasks
          </div>
        )}
      </CardContent>
      {title && (
        <CardFooter className="justify-center">
          <TaskEditor mode="create" />
        </CardFooter>
      )}
    </Card>
  );
}
