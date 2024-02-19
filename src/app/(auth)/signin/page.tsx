import SigninForm from "@/components/auth-forms/signin-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign In",
  description: "Sign In Page",
};

export default function SigninPage() {
  const cookieStore = cookies();

  const c = cookieStore.get(process.env.COOKIE_NAME!);
  if (c) {
    redirect("/home");
  }
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in your account in one-click</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <SigninForm />
      </CardContent>
      <CardFooter className="justify-center">
        <Link href="/register" className="font-bold text-blue-600">
          Don&apos;t have an account?
        </Link>
      </CardFooter>
    </Card>
  );
}
