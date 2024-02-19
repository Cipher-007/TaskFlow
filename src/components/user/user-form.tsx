"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Team, User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
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

const userFormSchema = z.object({
  teamId: z.string(),
});

type UserFormValue = z.infer<typeof userFormSchema>;

export default function UserForm({
  teams,
  setOpenEdit,
  user,
}: {
  teams: Team[];
  setOpenEdit: (toggle: boolean) => void;
  user: User;
}) {
  const userId = usePathname().split("/")[2];
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const defaultValues: Partial<UserFormValue> = {
    teamId: user.teamId!,
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function submitHandler(data: UserFormValue) {
    setDisabled(true);

    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        userId,
      }),
    });

    if (res.ok) {
      setOpenEdit(false);
      router.refresh();
    }

    setDisabled(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <FormField
          control={form.control}
          name="teamId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Team" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-6 text-center">
          <Button type="submit" aria-disabled={disabled}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
