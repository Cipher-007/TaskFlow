import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Logout from "./Logout";

export default async function UserProfile() {
  const user = await getUserFromCookie(cookies() as unknown as RequestCookies);

  if (!user) {
    console.log("User Not Found");
  }

  const userData = await db.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      email: true,
      firstName: true,
      lastName: true,
    },
  });

  return (
    <Card className="mx-auto w-96">
      <CardHeader>
        <CardTitle className="text-4xl font-bold">Profile</CardTitle>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent>
        <div className="flex items-center gap-8">
          <Avatar className="h-24 w-24">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-2xl font-medium">
            {userData?.firstName} {userData?.lastName}
          </div>
        </div>
        <Separator className="my-3" />
        <div>
          <div>
            <div className="text-2xl font-medium">{userData?.email}</div>
          </div>
          <div className="text-2xl font-medium">Role</div>
        </div>
      </CardContent>
      <CardFooter>
        <Logout />
      </CardFooter>
    </Card>
  );
}
