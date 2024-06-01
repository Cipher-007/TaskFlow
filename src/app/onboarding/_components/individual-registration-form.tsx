"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
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
  SelectValue,
} from "~/components/ui/select";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

const IndividualFormSchema = z.object({
  organizationId: z.string().min(1),
  role: z.enum([
    "TEAM_LEAD",
    "PRODUCT_OWNER",
    "PROJECT_MANAGER",
    "DEVELOPER",
    "FRONTEND_DEVELOPER",
    "BACKEND_DEVELOPER",
    "FULL_STACK_DEVELOPER",
    "QA_TESTER",
    "DEVOPS_ENGINEER",
    "DESIGNER",
  ]),
});

type IndividualFormValue = z.infer<typeof IndividualFormSchema>;

const defaultValues: IndividualFormValue = {
  role: "DEVELOPER",
  organizationId: "",
};

export default function IndividualRegistrationForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  const form = useForm<IndividualFormValue>({
    resolver: zodResolver(IndividualFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const org = api.organization.getAll.useQuery();
  const createUser = api.user.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Account created.",
        description: "Account created succesfully, redirecting....",
      });
      router.replace("/m");
    },
  });
  const userSubmit = api.organization.connectUser.useMutation();

  function onSubmit(data: IndividualFormValue) {
    userSubmit.mutate({
      ...data,
      organizationId: data.organizationId,
      userId: session?.user?.id ?? "",
    });
    createUser.mutate({
      role: data.role,
      globalRole: "USER",
      theme: "dark",
      onboarded: true,
    });
  }

  if (org.isSuccess) {
    const organizations = org.data;

    if (!organizations) {
      redirect("/register/organization");
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="organizationId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organizations</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Organizations" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {organizations.map((organization) => (
                      <SelectItem key={organization.id} value={organization.id}>
                        {organization.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="TEAM_LEAD">TEAM LEAD</SelectItem>
                    <SelectItem value="PRODUCT_OWNER">PRODUCT OWNER</SelectItem>
                    <SelectItem value="PROJECT_MANAGER">
                      PROJECT MANAGER
                    </SelectItem>
                    <SelectItem value="DEVELOPER">DEVELOPER</SelectItem>
                    <SelectItem value="FRONTEND_DEVELOPER">
                      FRONTEND DEVELOPER
                    </SelectItem>
                    <SelectItem value="BACKEND_DEVELOPER">
                      BACKEND DEVELOPER
                    </SelectItem>
                    <SelectItem value="FULL_STACK_DEVELOPER">
                      FULL STACK DEVELOPER
                    </SelectItem>
                    <SelectItem value="QA_TESTER">QA TESTER</SelectItem>
                    <SelectItem value="DEVOPS_ENGINEER">
                      DEVOPS ENGINEER
                    </SelectItem>
                    <SelectItem value="DESIGNER">DESIGNER</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center pt-4">
            <Button type="submit" className="mx-auto">
              Create account
            </Button>
          </div>
        </form>
      </Form>
    );
  }
}
