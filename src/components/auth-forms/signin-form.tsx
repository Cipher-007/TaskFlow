"use client";
import { Button } from "@/components/ui/button";
import { SigninFormValue, signinFormSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

const defaultValues: Partial<SigninFormValue> = {
  email: "",
  password: "",
};

export default function SigninForm() {
  const route = useRouter();
  const { toast } = useToast();
  const form = useForm<SigninFormValue>({
    resolver: zodResolver(signinFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: SigninFormValue) {
    const res = await fetch("/api/signin", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      toast({
        title: "Signin successful",
        description: "You are now signed in.",
      });
      route.replace("/home");
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
                <Input placeholder={"johndoe@email.com"} {...field} />
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
