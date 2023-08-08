"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle } from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { useToast } from "./ui/use-toast";
import { User } from "@prisma/client";
import { updateProfile } from "@/lib/api";

const profileFormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, {
        message: "First Name must be at least 2 characters.",
      })
      .max(30, {
        message: "First Name must not be longer than 30 characters.",
      }),
    lastName: z
      .string()
      .min(2, {
        message: "Last Name must be at least 2 characters.",
      })
      .max(30, {
        message: "Last Name must not be longer than 30 characters.",
      }),
    email: z
      .string()
      .min(1, {
        message: "Email must be at least 1 characters.",
      })
      .max(30, {
        message: "Email must not be longer than 30 characters.",
      }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 7 characters.",
      })
      .max(30, {
        message: "Username must not be longer than 30 characters.",
      }),
    new_password: z
      .string()
      .min(8, {
        message: "Password must be at least 7 characters.",
      })
      .max(30, {
        message: "Username must not be longer than 30 characters.",
      }),
    confirm_password: z
      .string()
      .min(8, {
        message: "Password must be at least 7 characters.",
      })
      .max(30, {
        message: "Username must not be longer than 30 characters.",
      }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["new_password"],
  });

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm({ data }: { data: User }) {
  const defaultValues: Partial<ProfileFormValues> = {
    firstName: data.firstName!,
    lastName: data.lastName!,
    email: data.email!,
  };
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(userData: ProfileFormValues) {
    const { confirm_password, ...body } = userData;
    console.log(body);
    const res = await updateProfile(body);

    if (res.ok) {
      toast({
        description: "Profile updated successfully.",
      });
    }
  }

  return (
    <Card className="mx-8 h-[94%] w-full">
      <CardHeader className="items-center">
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <Separator className="my-2" />
      <Card className="m-8 mx-auto w-[80%] p-8 outline outline-offset-2 outline-pink-500">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="flex flex-row gap-6">
              <div className="basis-1/2">
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
              </div>
              <div className="basis-1/2">
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
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="johndoe@email.com"
                      {...field}
                    />
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
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button type="submit">Update profile</Button>
            </div>
          </form>
        </Form>
      </Card>
    </Card>
  );
}
