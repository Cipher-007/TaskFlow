import type { Task } from "@prisma/client";

export type TaskFormProp = {
  mode: "create" | "edit";
  task?: Task;
  content?: { title: string; toastDescription: string };
  setToggle?: (toggle: boolean) => void;
};

export enum TASK_STATUS {
  NOT_STARTED = "NOT_STARTED",
  STARTED = "STARTED",
  COMPLETED = "COMPLETED",
}
