import { Input } from "@/components/ui/input";
import { createNewProject } from "@/lib/api";
import { cn, formatDate } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar as CalendarIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
import { useState } from "react";
import { Button } from "../ui/button";
import { ProjectFormValue, projectFormSchema } from "@/lib/zod";

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

export default function ProjectForm({
  setToggle,
}: {
  setToggle: (toggle: boolean) => void;
}) {
  const [isDisabled, setIsDisabled] = useState(false);
  const { toast } = useToast();

  const router = useRouter();
  let defaultValues: Partial<ProjectFormValue> = {
    name: "",
    description: "",
  };

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
      setToggle(false);
      form.resetField("name");
      form.resetField("description");
      form.resetField("due");
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
                  <Textarea placeholder="Project 0 description" {...field} />
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
        <div className="text-right">
          <Button type="submit" disabled={isDisabled}>
            Create Project
          </Button>
        </div>
      </form>
    </Form>
  );
}
