import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";
import type { Team } from "~/server/db/schema";
import { api } from "~/trpc/react";

const teamFormSchema = z.object({
  name: z.string().min(4, {
    message: "Team name must be at least 2 characters.",
  }),
  description: z.string().min(4, {
    message: "Team description must be at least 2 characters.",
  }),
});

type TeamFormValue = z.infer<typeof teamFormSchema>;

type Props = {
  setToggle: (toggle: boolean) => void;
  team?: Team;
  mode: "create" | "edit";
};

export default function TeamForm({ setToggle, team, mode }: Props) {
  const pathname = usePathname();
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const teamCreate = api.team.create.useMutation({
    onSuccess: () => {
      toast({
        description: `Your Team has been ${
          mode === "create" ? "created" : "updated"
        }.`,
      });

      form.reset();
      setToggle(false);
      router.refresh();
    },
  });
  let defaultValues: TeamFormValue;

  if (mode === "edit" && team) {
    defaultValues = {
      name: team.name,
      description: team.description,
    };
  } else {
    defaultValues = {
      name: "",
      description: "",
    };
  }

  const form = useForm<TeamFormValue>({
    resolver: zodResolver(teamFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: TeamFormValue) {
    setDisabled(true);
    teamCreate.mutate({
      ...data,
      organizationId: pathname.split("/")[2]!,
    });

    setDisabled(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input placeholder="Team 1" {...field} />
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
              <FormLabel>Team Description</FormLabel>
              <FormControl>
                <Input placeholder="Team 1 Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-4 text-center">
          <Button type="submit" aria-disabled={disabled}>
            {mode === "create" ? "Create" : "Edit"} Team
          </Button>
        </div>
      </form>
    </Form>
  );
}
