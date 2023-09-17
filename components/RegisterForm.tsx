"use client";
import { Button } from "@/components/ui/button";
import { register } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { RegisterUserFormValue, registerUserFormSchema } from "@/lib/zod";
import { useRouter } from "next/navigation";

const defaultValues: Partial<RegisterUserFormValue> = {};

export default function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<RegisterUserFormValue>({
    resolver: zodResolver(registerUserFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: RegisterUserFormValue) {
    const res = await register(data);

    if (res.ok) {
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
      });
      router.replace("/home");
    }

    if (res.status === 409) {
      toast({
        variant: "destructive",
        title: "Account already exists.",
        description: "This account already exists.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comfirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center py-6">
          <Button type="submit" className="mx-auto">
            Create account
          </Button>
        </div>
      </form>
    </Form>
  );
}
