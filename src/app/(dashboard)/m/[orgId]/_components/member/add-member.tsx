import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
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
import { api } from "~/trpc/react";

const FormSchema = z.object({
  users: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        toggle: z.boolean(),
      }),
    )
    .optional(),
});

type FormValue = z.infer<typeof FormSchema>;

type Props = {
  data:
    | {
        id: string;
        name: string;
        teamId: string;
      }[]
    | undefined;
  setToggle: (toggle: boolean) => void;
};

export default function AddMember({ data, setToggle }: Props) {
  const router = useRouter();
  const teamId = usePathname().split("/")[4];
  const updateUser = api.team.updateManyUsers.useMutation({
    onSuccess: () => {
      setToggle(false);
      router.refresh();
    },
  });

  const defaultValues: FormValue = {
    users: data?.map((employee) => ({
      id: employee.id,
      name: employee.name,
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

  function onSubmit(data: FormValue) {
    updateUser.mutate(
      (data.users ?? []).map((user) => ({
        userId: user.id,
        toggle: user.toggle,
        teamId: teamId!,
      })),
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col space-y-6"
      >
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
        <Button
          type="submit"
          disabled={updateUser.isPending}
          className="w-1/4 self-center"
        >
          {updateUser.isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
