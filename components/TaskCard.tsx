import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { TASK_STATUS, Task } from "@prisma/client";
import { cookies } from "next/headers";
import ButtonC from "./Button";
import Card from "./Card";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import NewTask from "./NewTask";

type TaskCardProps = {
  title?: string;
  tasks?: Task[];
};

async function getData() {
  const user = await getUserFromCookie(cookies() as unknown as RequestCookies);
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
export default async function TaskCard({ title, tasks }: TaskCardProps) {
  const data = tasks || (await getData());

  return (
    <Card>
      <div className="my-4 flex items-center justify-center">
        <div className="text-3xl text-gray-600">{title}</div>
      </div>
      <div>
        {data && data.length ? (
          <div>
            {data.map((task) => (
              <div className="py-2" key={task.id}>
                <div>
                  <span className="text-gray-800">{task.name}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-400">
                    {task.description}
                  </span>
                </div>
              </div>
            ))}
            <NewTask />
          </div>
        ) : (
          <div>no tasks</div>
        )}
      </div>
    </Card>
  );
}
