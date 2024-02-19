"use client";

import { useRouter } from "next/navigation";
import { formatDate } from "~/lib/utils";
import type { Task } from "~/server/db/schema";
import { api } from "~/trpc/react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useToast } from "../ui/use-toast";
import TaskEditor from "./task-editor";

type Props = {
  task: Task;
};

export default function SingleTask({ task }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const deleteTask = api.task.delete.useMutation({
    onSuccess: () => {
      toast({
        title: "Task deleted",
        description: "Task deleted successfully",
        variant: "destructive",
      });
      router.refresh();
    },
  });

  function deleteHandler() {
    deleteTask.mutate({ id: task.id });
  }

  return (
    <Card className="m-4 flex flex-row py-2">
      <CardHeader className="basis-1/3">
        <CardTitle className="text-sm md:text-xl">{task.name}</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          {task.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex basis-1/3 flex-row items-center justify-between gap-4 p-6 text-sm md:text-lg">
        {
          <>
            <div className="space-x-2">
              <span>Due :</span>
              <span>{formatDate(task.endDate)}</span>
            </div>
            <div>{task.priority}</div>
            <Badge className="text-sm md:text-lg">{task.status}</Badge>
          </>
        }
      </CardContent>
      <CardFooter className="flex basis-1/3 justify-end gap-4 py-6 pr-14">
        <TaskEditor mode="edit" task={task} />
        <Button variant="destructive" onClick={deleteHandler}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
