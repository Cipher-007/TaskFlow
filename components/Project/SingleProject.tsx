import { formatDate } from "@/lib/utils";
import type { Project, Task } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
type ProjectCardProps = Project & {
  tasks: Task[];
};

export default function ProjectCard({
  project,
}: {
  project: ProjectCardProps;
}) {
  const completedCount = project.tasks.filter(
    (t) => t.status === "COMPLETED",
  ).length;
  const progress = Math.ceil((completedCount / project.tasks.length) * 100);
  return (
    <Card className="transition-all duration-200 ease-in-out hover:scale-105">
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{formatDate(project.createdAt)}</CardDescription>
      </CardHeader>
      <CardContent className="pb-1">
        <div>{project.description}</div>
        {project.tasks.length > 0 ? (
          <>
            <div className="mb-2">
              <span className="text-gray-400">
                {completedCount}/{project.tasks.length} completed
              </span>
            </div>
            <div className="mb-2 h-2 w-full rounded-full bg-violet-200">
              <div
                className="h-full rounded-full bg-violet-600 text-center text-xs text-white"
                style={{ width: `${progress}%` }}
              />
            </div>
            <CardFooter className="flex-row-reverse pr-0">
              <span className="text-sm font-semibold text-gray-600">
                {progress}%
              </span>
            </CardFooter>
          </>
        ) : (
          <>
            <div className="my-2 h-7 w-full">
              <span className="text-gray-400">0 Tasks</span>
            </div>
            <div className="h-12"></div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

ProjectCard;
