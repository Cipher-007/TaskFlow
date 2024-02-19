import { ApprovalFormValue, approvalFormSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Team } from "@prisma/client";
import { SelectValue } from "@radix-ui/react-select";
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
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

export default function ApproveForm({
  teams,
  id,
  setToggle,
}: {
  teams: Team[];
  id: string;
  setToggle: (toggle: boolean) => void;
}) {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const defaultValues: Partial<ApprovalFormValue> = {
    teamId: "",
  };

  const form = useForm<ApprovalFormValue>({
    resolver: zodResolver(approvalFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function submitHandler(data: ApprovalFormValue) {
    setDisabled(true);

    const res = await fetch("/api/approve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        userId: id,
      }),
    });

    if (res.ok) {
      setToggle(false);
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
              <Select onValueChange={field.onChange}>
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
