import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TaskFormProp } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";
import { TaskFormValue, taskFormSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar as CalendarIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";

const Calendar = dynamic(() => import("@/components/ui/calendar"));

export default function TaskForm({
  mode,
  task,
  content,
  setToggle,
}: TaskFormProp) {
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const defaultValues = {
    name: task?.name,
    description: task?.description,
    startDate: task?.startDate,
    endDate: task?.endDate,
    status: task?.status,
    priority: task?.priority,
  };

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
        startDate: data.startDate?.toISOString(),
        endDate: data.endDate?.toISOString(),
        projectId: pathname.split("/")[2],
      };
      res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } else {
      body = {
        ...data,
        startDate: data.startDate?.toISOString(),
        endDate: data.endDate?.toISOString(),
        id: task?.id,
      };
      res = await fetch("/api/tasks", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    }

    if (res.ok) {
      toast({
        description: content!.toastDescription,
      });
      setToggle!(false);
      form.reset();
      router.refresh();
    }
    setIsDisabled(false);
  }

  return (
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
                <FormMessage className="col-span-3 col-start-2" />
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
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">Start Date</FormLabel>
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
                            formatDate(field.value)
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
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">End Date</FormLabel>
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
                            formatDate(field.value)
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
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">Priority</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Task Priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="HIGH">HIGH</SelectItem>
                    <SelectItem value="NORMAL">NORMAL</SelectItem>
                    <SelectItem value="LOW">LOW</SelectItem>
                  </SelectContent>
                </Select>
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
                    <SelectItem value="TODO">TODO</SelectItem>
                    <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                    <SelectItem value="ON_HOLD">ON_HOLD</SelectItem>
                    <SelectItem value="DONE">DONE</SelectItem>
                    <SelectItem value="CANCELED">CANCELED</SelectItem>
                    <SelectItem value="BACKLOG">BACKLOG</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="text-right">
          <Button disabled={isDisabled} type="submit">
            Save changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
