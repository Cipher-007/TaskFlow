"use client";
import { Button } from "@/components/ui/button";
import { signin } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

const userFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(30, {
      message: "Password must not be longer than 30 characters.",
    }),
});

type UserFormValue = z.infer<typeof userFormSchema>;

const defaultValues: Partial<UserFormValue> = {};

export default function SigninForm() {
  const route = useRouter();
  const { toast } = useToast();
  const form = useForm<UserFormValue>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: UserFormValue) {
    const res = await signin(data);

    if (res.ok) {
      toast({
        title: "Signin successful",
        description: "You are now signed in.",
      });
      route.push("/home");
    }

    if (res.status === 401) {
      toast({
        title: "Signin failed",
        description: "Invalid credentials.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between py-6">
          <Button type="submit" className="mx-auto">
            Sign In
          </Button>
        </div>
      </form>
    </Form>
  );
}
