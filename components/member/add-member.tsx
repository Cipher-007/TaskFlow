"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  users: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      toggle: z.boolean(),
    }),
  ),
});

type FormValue = z.infer<typeof FormSchema>;

export function AddMember({
  employees,
  setToggle,
}: {
  employees: User[];
  setToggle: (toggle: boolean) => void;
}) {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const teamId = usePathname().split("/")[2];
  const defaultValues: FormValue = {
    users: employees.map((employee) => ({
      id: employee.id,
      name: `${employee.firstName} ${employee.lastName}`,
      toggle: employee.teamId === teamId,
    })),
  };

  const form = useForm<FormValue>({
    resolver: zodResolver(FormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, update } = useFieldArray({
    name: "users",
    control: form.control,
  });

  async function onSubmit(data: FormValue) {
    setDisabled(true);
    console.log("submitted data: ", { ...data, teamId });

    const res = await fetch("/api/members", {
      method: "POST",
      body: JSON.stringify(data.users.map((user) => ({ ...user, teamId }))),
    });

    if (res.ok) {
      console.log("success");
      setToggle(false);
      router.refresh();
    }
    setDisabled(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {fields.map((field, index) => (
          <FormField
            control={form.control}
            key={field.id}
            name={`users.${index}`}
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
