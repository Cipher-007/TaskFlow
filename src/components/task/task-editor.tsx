"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import TaskForm, { type TaskFormProp } from "./tasks-form";

const EditTaskForm = {
  title: "Edit Task",
  toastDescription: "Task updated successfully.",
};

const CreateTaskForm = {
  title: "Create Task",
  toastDescription: "Task created successfully.",
};

export default function TaskEditor({ mode, task }: TaskFormProp) {
  const [open, setOpen] = useState(false);
  const content = mode === "create" ? CreateTaskForm : EditTaskForm;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={mode === "create" ? "default" : "outline"}
          className="text-sm"
        >
          {content.title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="items-center">
          <DialogTitle>{content.title}</DialogTitle>
        </DialogHeader>
        <TaskForm
          mode={mode}
          task={task}
          content={content}
          setToggle={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
