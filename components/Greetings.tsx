import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import ButtonC from "./Button";
import Card from "./Card";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

async function getData() {
  return await getUserFromCookie(cookies() as unknown as RequestCookies);
}

export default async function Greetings() {
  const user = await getData();

  return (
    <Card className="relative w-full py-4">
      <div className="mb-4">
        <h1 className="mb-4 text-3xl font-bold text-gray-700">
          Hello, {user!.firstName}!
        </h1>
        <h4 className="text-xl text-gray-400">
          Check your daily tasks and schedule
        </h4>
      </div>
      <div>
        <ButtonC size="large">Today&apos;s Schedule</ButtonC>
      </div>
    </Card>
  );
}
