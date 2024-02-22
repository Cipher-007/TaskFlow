"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Switch } from "~/components/ui/switch";
import type { Team } from "~/server/db/schema";
import { api } from "~/trpc/react";

type Props = {
  setOpenEdit: (toggle: boolean) => void;
  userId: string;
  teamsData: Team[];
  userTeams: {
    id: string;
    name: string;
  }[];
};

const userFormSchema = z.object({
  teams: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      toggle: z.boolean(),
    }),
  ),
});

type UserFormValue = z.infer<typeof userFormSchema>;

export default function UserForm({
  setOpenEdit,
  userId,
  teamsData,
  userTeams,
}: Props) {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const updateUser = api.user.updateTeams.useMutation({
    onSuccess: () => {
      setOpenEdit(false);
      router.refresh();
    },
  });
  const defaultValues: UserFormValue = {
    teams: teamsData.map((team) => ({
      id: team.id,
      name: team.name,
      toggle: userTeams.every((userTeam) => userTeam.id === team.id),
    })),
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, update } = useFieldArray({
    name: "teams",
    control: form.control,
  });

  function submitHandler(data: UserFormValue) {
    setDisabled(true);

    updateUser.mutate({
      id: userId,
      teams: data.teams,
    });

    setDisabled(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        {fields.map((field, index) => (
          <FormField
            control={form.control}
            key={field.id}
            name={`teams.${index}`}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <FormLabel>{field.value.name}</FormLabel>
                <FormControl>
                  <Switch
                    onCheckedChange={() =>
                      update(index, {
                        ...field.value,
                        toggle: !field.value.toggle,
                      })
                    }
                    checked={field.value.toggle}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ))}
        <div className="pt-6 text-center">
          <Button type="submit" aria-disabled={disabled}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
