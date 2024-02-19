"use client";

import { Button } from "@/components/ui/button";
import {
  IndividualRegistrationFormSchema,
  IndividualRegistrationFormValue,
} from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Organization } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useToast } from "../ui/use-toast";

const defaultValues: IndividualRegistrationFormValue = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  password: "",
  confirmPassword: "",
  role: "DEVELOPER",
  organizationId: "",
};

export default function IndividualRegistrationForm({
  organizations,
}: {
  organizations: Partial<Organization>[];
}) {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<IndividualRegistrationFormValue>({
    resolver: zodResolver(IndividualRegistrationFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: IndividualRegistrationFormValue) {
    console.log(data);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ User: { data }, mode: "individual" }),
    });

    if (res.ok) {
      toast({
        title: "Account created.",
        description: "Account created succesfully, redirecting....",
      });
      form.reset();
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
        <div className="flex w-full gap-2">
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
                <Input placeholder="johndoe@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input placeholder="9876543210" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                    <SelectItem key={organization.id} value={organization.id!}>
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
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ORGANIZATION_ADMIN">
                    ORGANIZATION ADMIN
                  </SelectItem>
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
