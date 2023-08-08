import RegisterForm from "@/components/RegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Register",
  description: "Register Page",
};

export default function Register() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Create your new account in one-click</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <RegisterForm />
      </CardContent>
      <CardFooter>
        <Link href="/signin" className="font-bold text-blue-600">
          Already have an account?
        </Link>
      </CardFooter>
    </Card>
  );
}
