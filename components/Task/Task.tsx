"use client";
import { Task } from "@prisma/client";
import React from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import TaskForm from "./TaskForm";
import { Badge } from "../ui/badge";
import { updateTask } from "@/lib/api";
import { useToast } from "../ui/use-toast";

type Props = {
  task: Task;
};

export default function TaskC({ task }: Props) {
  const { toast } = useToast();

  async function deleteHandler() {
    const res = await updateTask({
      id: task.id,
      deleted: true,
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
    <Card className="m-5 flex flex-row py-2">
      <CardHeader className="basis-1/3">
        <CardTitle>{task.name}</CardTitle>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <CardContent className="basis-1/3 px-1 py-6 text-center">
        {(task.due || task.status) && (
          <>
            <div className="pb-2">
              <span className="pr-2">Due:</span>
              <span className="pr-2">
                {task.due?.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <Badge className="text-sm">{task.status}</Badge>
          </>
        )}
      </CardContent>
      <CardFooter className="flex basis-1/3 justify-end gap-4 py-6 pr-14">
        <TaskForm title="Edit Task" variant="outline" task={task} />
        <Button variant="destructive" onClick={deleteHandler}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
