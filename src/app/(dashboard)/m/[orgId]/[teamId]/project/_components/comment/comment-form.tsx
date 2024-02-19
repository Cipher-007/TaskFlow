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
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import UserAvatar from "~/components/user/user-avatar";
import { api } from "~/trpc/react";

const commentFormSchema = z.object({
  comment: z.string().min(1, {
    message: "Comment must be at least 1 characters.",
  }),
});

type CommentFormValue = z.infer<typeof commentFormSchema>;

export default function CommentForm({
  setToggle,
}: {
  setToggle: (toggle: boolean) => void;
}) {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const pathname = usePathname();
  const createComment = api.commment.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setToggle(false);
    },
  });
  const projectId = pathname.split("/")[2];

  const defaultValues: Partial<CommentFormValue> = {
    comment: "",
  };
  const form = useForm<CommentFormValue>({
    resolver: zodResolver(commentFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function submitHandler(data: CommentFormValue) {
    setDisabled(true);

    createComment.mutate({
      content: data.comment,
      projectId: projectId!,
    });

    setDisabled(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <div className="grid w-full grid-cols-6 pb-4">
          <div className="">
            <UserAvatar />
          </div>
          <div className="col-span-5">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Comment" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="text-center">
          <Button type="submit" aria-disabled={disabled}>
            Post
          </Button>
        </div>
      </form>
    </Form>
  );
}
