"use client";

import { TeamFormValue, teamFormSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "../ui/input";
import type { Team } from "@prisma/client";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {
  setToggle: (toggle: boolean) => void;
  team?: Partial<Team>;
  mode: "create" | "edit";
};

export default function TeamForm({ setToggle, team, mode }: Props) {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  let defaultValues: Partial<TeamFormValue>;

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

  async function onSubmit(data: TeamFormValue) {
    setDisabled(true);

    const res = await fetch("/api/team", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, id: team?.id }),
    });

    if (res.ok) {
      toast({
        description: `Your Team has been ${
          mode === "create" ? "created" : "updated"
        }.`,
      });
      if (mode === "create") {
        form.reset();
      }
    }
    setToggle(false);
    setDisabled(false);
    router.refresh();
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
