"use client";

import { Button } from "@/components/ui/button";
import {
  OrganizationRegistrationFormValue,
  organizationRegistrationSchema,
} from "@/lib/zod";
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

export default function OrganizationRegistrationForm() {
  const defaultValues: OrganizationRegistrationFormValue = {
    confirmPassword: "",
    contact: "",
    email: "",
    firstName: "",
    lastName: "",
    organizationcontact: "",
    organizationemail: "",
    organizationName: "",
    password: "",
  };
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<OrganizationRegistrationFormValue>({
    resolver: zodResolver(organizationRegistrationSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: OrganizationRegistrationFormValue) {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Organization: {
          name: data.organizationName,
          email: data.organizationemail,
          contact: data.organizationcontact,
        },
        User: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          contact: data.contact,
          password: data.password,
        },
        mode: "organization",
      }),
    });

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
        <FormField
          control={form.control}
          name="organizationName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input placeholder="Project" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="organizationemail"
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
        <FormField
          control={form.control}
          name="organizationcontact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Contact</FormLabel>
              <FormControl>
                <Input placeholder="9876543210" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                <Input placeholder="admin@projectverse.com" {...field} />
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
              <FormLabel>Contact</FormLabel>
              <FormControl>
                <Input placeholder="9876543210" {...field} />
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
