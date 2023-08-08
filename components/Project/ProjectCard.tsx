import { FC } from "react";
import { Prisma, TASK_STATUS } from "@prisma/client";
import Card from "../Card";
import clsx from "clsx";

const projectWithTasks = Prisma.validator<Prisma.ProjectArgs>()({
  include: { tasks: true },
});

type ProjectWithTasks = Prisma.ProjectGetPayload<typeof projectWithTasks>;

const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const ProjectCard: FC<{ project: ProjectWithTasks }> = ({ project }) => {
  const completedCount = project.tasks.filter(
    (t) => t.status === TASK_STATUS.COMPLETED,
  ).length;
  const progress = Math.ceil((completedCount / project.tasks.length) * 100);
  return (
    <Card className="!px-6 !py-8 transition-all duration-200 ease-in-out hover:scale-105">
      <div>
        <span className="text-sm text-gray-300">
          {formatDate(project.createdAt)}
        </span>
      </div>
      <div className="mb-6">
        <span className="text-3xl text-gray-600">{project.name}</span>
      </div>
      <div className="mb-2">
        <span className="text-gray-400">
          {completedCount}/{project.tasks.length} completed
        </span>
      </div>
      <div>
        <div className="mb-2 h-2 w-full rounded-full bg-violet-200">
          <div
            className={clsx(
              "h-full rounded-full bg-violet-600 text-center text-xs text-white",
            )}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-right">
          <span className="text-sm font-semibold text-gray-600">
            {progress}%
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
