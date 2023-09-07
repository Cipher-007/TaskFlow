"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createNewProject } from "@/lib/api";
import { cn, formatDate } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";

const Calendar = dynamic(() => import("@/components/ui/calendar"));

const Popover = dynamic(() =>
  import("@/components/ui/popover").then((mod) => mod.Popover),
);

const PopoverContent = dynamic(() =>
  import("@/components/ui/popover").then((mod) => mod.PopoverContent),
);

const PopoverTrigger = dynamic(() =>
  import("@/components/ui/popover").then((mod) => mod.PopoverTrigger),
);

const Dialog = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.Dialog),
);

const DialogContent = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.DialogContent),
);

const DialogFooter = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.DialogFooter),
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

const DialogDescription = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.DialogDescription),
);

const projectFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Project name must be at least 2 characters.",
    })
    .max(15, {
      message: "Project name must not be longer than 30 characters.",
    }),
  description: z
    .string()
    .min(2, {
      message: "Project description must be at least 2 characters.",
    })
    .max(255, {
      message: "Project description must not be longer than 100 characters.",
    }),
  due: z.coerce.date(),
});

type ProjectFormValue = z.infer<typeof projectFormSchema>;

export default function NewProject() {
  let defaultValues: Partial<ProjectFormValue> = {
    name: "",
    description: "",
  };

  const { toast } = useToast();

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const form = useForm<ProjectFormValue>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ProjectFormValue) {
    setIsDisabled(true);

    const res = await createNewProject(data);

    if (res.ok) {
      toast({
        title: "Project created",
        description: "Your project has been created.",
      });
      setOpen(false);
      form.resetField("name");
      form.resetField("description");
      form.resetField("due");
      router.refresh();
    }
    setIsDisabled(false);
  }

  return (
    <div className="flex items-center justify-center px-6 py-8 transition-all duration-200 ease-in-out hover:scale-105">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-1" />
            New Project
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
            <DialogDescription>
              Fill out the details below to initiate a new project
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Project 0" {...field} />
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
                        <Textarea
                          placeholder="Project 0 description"
                          {...field}
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
                      <FormLabel>Due Date</FormLabel>
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
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isDisabled}>
                  Create Project
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
