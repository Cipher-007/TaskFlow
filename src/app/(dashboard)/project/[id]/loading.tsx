import TasksCardSkeleton from "@/components/task/tasks-card-skeleton";

export default function ProjectLoading() {
  return (
    <div className="mx-32 w-full">
      <TasksCardSkeleton title="none" />
    </div>
  );
}
