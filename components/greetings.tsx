import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

export default async function Greetings() {
  const user = await getUserFromCookie(cookies());

  return (
    <Card className="relative w-full">
      <CardHeader>
        <CardTitle>Hello, {user!.firstName}!</CardTitle>
      </CardHeader>
      <CardContent>
        <h4 className="text-xl text-gray-400">
          Check your daily tasks and schedule
        </h4>
      </CardContent>
      <CardFooter>
        <Button className="rounded-3xl bg-violet-500 px-8 py-4 text-2xl font-bold transition duration-200 ease-in-out hover:scale-110 hover:bg-violet-600 active:scale-100">
          Today&apos;s Schedule
        </Button>
      </CardFooter>
    </Card>
  );
}
