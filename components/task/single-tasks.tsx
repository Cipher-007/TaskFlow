"use client";

import { formatDate } from "@/lib/utils";
import type { Task } from "@prisma/client";
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

  async function deleteHandler() {
    const res = await fetch("/api/tasks", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: task.id }),
    });

    if (res.ok) {
      toast({
        title: "Task deleted",
        description: "Task deleted successfully",
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="m-4 flex flex-row py-2">
      <CardHeader className="basis-1/3">
        <CardTitle>{task.name}</CardTitle>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex basis-1/3 flex-row items-center justify-between gap-4 p-6">
        {
          <>
            <div className="space-x-2">
              <span>Due :</span>
              <span>{formatDate(task.endDate)}</span>
            </div>
            <div>{task.priority}</div>
            <Badge className="text-sm">{task.status}</Badge>
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
