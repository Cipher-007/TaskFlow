"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { CommentFormValue, commentFormSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function CommentForm({
  setToggle,
}: {
  setToggle: (toggle: boolean) => void;
}) {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const pathname = usePathname();

  const projectId = pathname.split("/")[2];

  const defaultValues: Partial<CommentFormValue> = {
    comment: "",
  };
  const form = useForm<CommentFormValue>({
    resolver: zodResolver(commentFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function submitHandler(data: CommentFormValue) {
    setDisabled(true);
    const res = await fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: data.comment, projectId }),
    });

    if (res.ok) {
      router.refresh();
      setToggle(false);
    }

    setDisabled(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <div className="grid gap-4 pb-4">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Input placeholder="Comment" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="text-center">
          <Button type="submit" aria-disabled={disabled}>
            Create Comment
          </Button>
        </div>
      </form>
    </Form>
  );
}
