"use client";
import { Button } from "@/components/ui/button";
import { TaskFormProp } from "@/lib/types";
import dynamic from "next/dynamic";
import { useState } from "react";
import TaskForm from "./TaskForm";

const Dialog = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.Dialog),
);

const DialogContent = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.DialogContent),
);

const DialogHeader = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.DialogHeader),
);

const DialogTitle = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.DialogTitle),
);

const DialogTrigger = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.DialogTrigger),
);

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
  let content = mode === "create" ? CreateTaskForm : EditTaskForm;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={mode === "create" ? "default" : "outline"}>
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
