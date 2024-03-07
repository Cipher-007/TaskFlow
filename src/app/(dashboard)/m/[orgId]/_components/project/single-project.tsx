import { formatDate } from "~/lib/utils";
import { api } from "~/trpc/server";
import { CalendarIcon, TargetIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { type Project } from "~/server/db/schema";

export default async function SingleProject({ project }: { project: Project }) {
  const { completed, total } = await api.task.getCountByProject.query({
    projectId: project.id,
  });

  const completedCount = completed;
  let progress = Math.ceil((completedCount / total) * 100);

  if (isNaN(progress)) progress = 0;

  return (
    <Card className="transition-all duration-200 ease-in-out hover:scale-105">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>{project.name}</span>
          <span className="text-base">{project.priority}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-1">
        <div className="flex justify-between pb-2 text-sm lg:text-base">
          <div className="flex items-center">
            Start: <CalendarIcon className="mx-1" />
            {formatDate(project.startDate)}
          </div>
          <div className="flex items-center">
            End: <TargetIcon className="mx-1" />
            {formatDate(project.endDate)}
          </div>
        </div>
        <div className="py-2">{project.description}</div>
        <Separator />
        <CardFooter className="flex flex-col px-0">
          <div className="my-2 h-2 w-full rounded-full bg-violet-200">
            <div
              className="h-full rounded-full bg-violet-600 text-center text-xs text-white"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="self-end text-sm font-semibold text-gray-600">
            {progress}%
          </div>
          <div className="self-start">
            Last updated: {formatDate(project.updatedAt ?? project.createdAt)}
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
