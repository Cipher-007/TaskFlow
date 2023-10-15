import IndividualRegistrationForm from "@/components/auth-forms/individual-registration-form";
import OrganizationRegistrationForm from "@/components/auth-forms/organization-registration-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Register",
  description: "Register Page",
};

export default async function RegisterPage() {
  const cookieStore = cookies();

  const c = cookieStore.get(process.env.COOKIE_NAME!);
  if (c) {
    redirect("/home");
  }

  const organizations = await db.organization.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Create your new account in one-click</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <Tabs defaultValue="individual">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="organization">Organization</TabsTrigger>
          </TabsList>
          <TabsContent value="individual">
            <IndividualRegistrationForm organizations={organizations} />
          </TabsContent>
          <TabsContent value="organization">
            <OrganizationRegistrationForm />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="justify-center">
        <Link href="/signin" className="font-bold text-blue-600">
          Already have an account?
        </Link>
      </CardFooter>
    </Card>
  );
}
