import TasksCardSkeleton from "@/components/Task/TasksCardSkeleton";

export default function ProjectLoading() {
  return (
    <div className="mx-32 w-full">
      <TasksCardSkeleton title="none" />
    </div>
  );
}
