"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createNewTask, updateTask } from "@/lib/api";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { TASK_STATUS, Task } from "@prisma/client";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";

type TaskForm = {
  mode: "create" | "edit";
  task?: Task;
};

const taskFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Task name must be at least 2 characters.",
    })
    .max(15, {
      message: "Task name must not be longer than 30 characters.",
    }),
  description: z
    .string()
    .min(2, {
      message: "Task description must be at least 2 characters.",
    })
    .max(255, {
      message: "Task description must not be longer than 255 characters.",
    }),
  due: z.coerce.date(),
  status: z.enum([
    TASK_STATUS.NOT_STARTED,
    TASK_STATUS.STARTED,
    TASK_STATUS.COMPLETED,
  ]),
});

const EditTaskForm = {
  title: "Edit Task",
  toastDescription: "Task updated successfully.",
};

const CreateTaskForm = {
  title: "Create Task",
  toastDescription: "Task created successfully.",
};

type TaskFormValue = z.infer<typeof taskFormSchema>;

export default function TaskForm({ mode, task }: TaskForm) {
  let content = mode === "create" ? CreateTaskForm : EditTaskForm;

  let defaultValues: Partial<TaskFormValue> = {
    name: "",
    description: "",
  };
  if (task && task.due && task.status) {
    defaultValues = {
      name: task?.name,
      description: task?.description,
      due: task?.due,
      status: task?.status,
    };
  }

  const [isDisabled, setIsDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { toast } = useToast();

  const form = useForm<TaskFormValue>({
    resolver: zodResolver(taskFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: TaskFormValue) {
    setIsDisabled(true);

    let res;
    let body;

    if (mode === "create") {
      body = {
        ...data,
        due: data.due?.toISOString(),
        projectId: pathname.split("/")[2],
      };
      res = await createNewTask(body);
    } else {
      body = { ...data, due: data.due?.toISOString(), id: task?.id };
      res = await updateTask(body);
    }

    if (res.ok) {
      toast({
        description: content.toastDescription,
      });
      setOpen(false);
      form.resetField("name");
      form.resetField("description");
      form.resetField("due");
      form.resetField("status");
      router.refresh();
    }
    setIsDisabled(false);
  }

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Task 0"
                        {...field}
                        className="col-span-3"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Task 0 description"
                        {...field}
                        className="col-span-3"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="due"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Due</FormLabel>
                    <div className="col-span-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date("2025-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Task Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                        <SelectItem value="NOT_STARTED">NOT_STARTED</SelectItem>
                        <SelectItem value="STARTED">STARTED</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button disabled={isDisabled} type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
