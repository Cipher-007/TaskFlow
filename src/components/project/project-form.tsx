"use client";

import { Input } from "@/components/ui/input";
import { cn, formatDate } from "@/lib/utils";
import { ProjectFormValue, projectFormSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Project } from "@prisma/client";
import { Calendar as CalendarIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
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

type Props = {
  setToggle: (toggle: boolean) => void;
  mode: "create" | "edit";
  project?: Partial<Project>;
};

export default function ProjectForm({ project, mode, setToggle }: Props) {
  const [disabled, setDisabled] = useState(false);
  const { toast } = useToast();

  const router = useRouter();
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

  async function onSubmit(data: ProjectFormValue) {
    setDisabled(true);

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        endDate: data.endDate!.toISOString(),
        startDate: data.startDate!.toISOString(),
        id: project?.id,
      }),
    });

    if (res.ok) {
      toast({
        title: "Project created",
        description: "Your project has been created.",
      });
      setToggle(false);
      form.reset();
      router.refresh();
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
