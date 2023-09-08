import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import ProfileForm from "../Profile/ProfileForm";

async function getData() {
  const user = await getUserFromCookie(cookies());
  return await db.user.findUnique({
    where: {
      id: user?.id,
    },
  });
}

export default async function Profile() {
  const user = await getData();
  return (
    <Card className="mx-8 h-[94%] w-full">
      <CardHeader className="items-center">
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <Separator className="my-2" />
      <Card className="m-8 mx-auto w-[80%] p-8 outline outline-offset-2 outline-pink-500">
        <ProfileForm data={user!} />
      </Card>
    </Card>
  );
}
