import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.enum([
    "TODO",
    "IN_PROGRESS",
    "ON_HOLD",
    "DONE",
    "CANCELED",
    "BACKLOG",
  ]),
  priority: z.enum(["LOW", "NORMAL", "HIGH"]),
  startDate: z.date(),
  endDate: z.date(),
});

export type Task = z.infer<typeof taskSchema>;
