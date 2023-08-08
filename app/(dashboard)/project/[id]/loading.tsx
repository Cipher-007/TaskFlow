import TasksCardSkeleton from "@/components/Task/TasksCardSkeleton";
import React from "react";

type Props = {};

export default function ProjectLoader({}: Props) {
  return (
    <div className="mx-32 w-full">
      <TasksCardSkeleton title="none" />
    </div>
  );
}
