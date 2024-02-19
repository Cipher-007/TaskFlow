import { Input } from "~/components/ui/input";
import { cn, formatDate } from "~/lib/utils";
import { api } from "~/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar as CalendarIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { useToast } from "~/components/ui/use-toast";
import { type Project } from "~/server/db/schema";
import Calendar from "~/components/ui/calendar";

const projectFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Project name must be at least 2 characters.",
    })
    .max(30, {
      message: "Project name must not be longer than 30 characters.",
    }),
  description: z.string().min(2, {
    message: "Project description must be at least 2 characters.",
  }),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  priority: z.enum(["LOW", "NORMAL", "HIGH"]),
});

type ProjectFormValue = z.infer<typeof projectFormSchema>;

type Props = {
  setToggle: (toggle: boolean) => void;
  mode: "create" | "edit";
  project?: Project;
};

export default function ProjectForm({ project, mode, setToggle }: Props) {
  const pathname = usePathname();
  const orgId = pathname.split("/")[2];
  const teamId = pathname.split("/")[3];
  const [disabled, setDisabled] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const createProject = api.project.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Project created",
        description: "Your project has been created.",
      });
      setToggle(false);
      router.refresh();
    },
  });

  const updateProject = api.project.update.useMutation({
    onSuccess: () => {
      toast({
        title: "Project updated",
        description: "Your project has been updated.",
      });
      setToggle(false);
      router.refresh();
    },
  });
  let defaultValues: Partial<ProjectFormValue>;

  if (mode === "edit" && project) {
    defaultValues = {
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
      priority: project.priority,
    };
  } else {
    defaultValues = {
      name: "",
      description: "",
      priority: "NORMAL",
    };
  }

  const form = useForm<ProjectFormValue>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProjectFormValue) {
    setDisabled(true);

    const body = {
      ...data,
      organizationId: orgId!,
      teamId: teamId!,
    };

    if (mode === "create") {
      createProject.mutate(body);
    } else if (mode === "edit" && project) {
      updateProject.mutate({ ...body, id: project.id });
    }

    setDisabled(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 pb-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="Project 1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Project 1 description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel>Start Date</FormLabel>
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
                            <span>Pick due date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(data) => data > new Date("2025-01-01")}
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
            name="endDate"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel>End Date</FormLabel>
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
                            <span>Pick due date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(data) => data > new Date("2025-01-01")}
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
            name="priority"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel>Status</FormLabel>
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
                    <SelectItem value="LOW">LOW</SelectItem>
                    <SelectItem value="NORMAL">NORMAL</SelectItem>
                    <SelectItem value="HIGH">HIGH</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="text-right">
          <Button type="submit" aria-disabled={disabled}>
            Create Project
          </Button>
        </div>
      </form>
    </Form>
  );
}
