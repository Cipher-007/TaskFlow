"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

const organizationSchema = z.object({
  organizationName: z.string().min(4, {
    message: "Organization name must be at least 2 characters long",
  }),
  organizationEmail: z.string().email({
    message: "Please enter a valid email",
  }),
});

type OrganizationFormValue = z.infer<typeof organizationSchema>;

const defaultValues: OrganizationFormValue = {
  organizationEmail: "",
  organizationName: "",
};

export default function OrganizationRegistrationForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<OrganizationFormValue>({
    resolver: zodResolver(organizationSchema),
    defaultValues,
    mode: "onChange",
  });
  const createUser = api.user.create.useMutation();
  const org = api.organization.create.useMutation({
    onSuccess: () => {
      toast({
        description: "Organization created successfully",
      });
      form.reset();
      router.replace("/m");
    },

    onError: (err) => {
      toast({
        description: `${err.message}`,
      });
    },
  });

  function onSubmit(data: OrganizationFormValue) {
    org.mutate(data);
    createUser.mutate({
      globalRole: "ADMIN",
      role: "TEAM_LEAD",
      theme: "dark",
      onboarded: true,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="organizationName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input placeholder="ProjectVerse" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="organizationEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Email</FormLabel>
              <FormControl>
                <Input placeholder="admin@projectverse.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center pt-4">
          <Button type="submit" className="mx-auto">
            Create Organization
          </Button>
        </div>
      </form>
    </Form>
  );
}
