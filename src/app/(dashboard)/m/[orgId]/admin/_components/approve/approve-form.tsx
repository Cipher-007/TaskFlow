import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
import { useRouter } from "next/navigation";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "~/components/ui/select";
import type { Team } from "~/server/db/schema";
import { api } from "~/trpc/react";

const approvalFormSchema = z.object({
  teamId: z.string(),
});

type ApprovalFormValue = z.infer<typeof approvalFormSchema>;

export default function ApproveForm({
  id,
  teams,
  setToggle,
}: {
  teams: Team[];
  id: string;
  setToggle: (toggle: boolean) => void;
}) {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const approveRequest = api.requests.updateRequest.useMutation({
    onSuccess() {
      setToggle(false);
      router.refresh();
    },
  });
  const defaultValues: ApprovalFormValue = {
    teamId: "",
  };

  const form = useForm<ApprovalFormValue>({
    resolver: zodResolver(approvalFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function submitHandler(data: ApprovalFormValue) {
    setDisabled(true);

    approveRequest.mutate({
      ...data,
      userId: id,
      status: "APPROVED",
    });

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
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Team" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={String(team.id)}>
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
