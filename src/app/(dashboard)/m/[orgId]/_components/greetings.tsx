import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getServerAuthSession } from "~/server/auth";
import Link from "next/link";

export default async function Greetings({ orgId }: { orgId: string }) {
  const session = await getServerAuthSession();

  return (
    <Card className="relative w-full">
      <CardHeader>
        <CardTitle>Hello, {session?.user?.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <h4 className="text-xl text-gray-400">
          Check your daily tasks and schedule
        </h4>
      </CardContent>
      <CardFooter>
        <Link
          href={`/m/${orgId}/calendar`}
          className="rounded-3xl bg-violet-500 px-8 py-2 text-2xl font-bold transition duration-200 ease-in-out hover:scale-110 hover:bg-violet-600 active:scale-100"
        >
          Today&apos;s Schedule
        </Link>
      </CardFooter>
    </Card>
  );
}
