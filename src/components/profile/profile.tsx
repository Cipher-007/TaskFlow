import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import Logout from "../logout";

export default async function Profile() {
  const user = await getUserFromCookie(cookies());

  if (!user) {
    console.log("User Not Found");
  }

  const userData = await db.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      team: {
        include: {
          members: true,
        },
      },
      Organization: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <Card className="mx-auto w-1/3">
      <CardHeader className="items-center">
        <CardTitle className="text-4xl font-bold">Profile</CardTitle>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent>
        <div className="flex items-center gap-8">
          <Avatar className="h-24 w-24">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-2xl font-semibold">
            {userData?.firstName} {userData?.lastName}
          </div>
        </div>
        <Separator className="my-3" />
        <div className="text-2xl font-medium">
          <div>Email: {userData?.email}</div>
          <div className="capitalize">Role: {userData?.role.toLowerCase()}</div>
          <div>
            {userData?.Organization ? (
              <div key={userData.Organization?.name}>
                <div>Organization Name: {userData.Organization.name}</div>
              </div>
            ) : null}
            {userData?.team ? (
              <div key={userData.team?.id}>
                <div>Team Name: {userData.team.name}</div>
              </div>
            ) : null}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Logout />
      </CardFooter>
    </Card>
  );
}
