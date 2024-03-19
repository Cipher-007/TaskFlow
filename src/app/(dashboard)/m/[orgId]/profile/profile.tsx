import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { getInitials } from "~/lib/utils";
import { signOut } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Profile() {
  const userData = await api.user.getCurrentUserInfo();

  return (
    <Card className="w-1/2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Avatar className="h-20 w-20">
            <AvatarImage src={userData?.image ?? ""} alt={userData?.name} />
            <AvatarFallback>{getInitials(userData?.name ?? "")}</AvatarFallback>
          </Avatar>
          <CardTitle className="font-semibold">{userData?.name}</CardTitle>
        </div>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent>
        <form
          className="text-right"
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/auth/signin" });
          }}
        >
          <Button>Sign Out</Button>
        </form>
        {/*
        <div className="text-2xl font-medium">
          <div>Email: {userData?.email}</div>
          <div className="capitalize">Role: {userData?.role}</div>
          <div>
            {userData?.Organization ? (
              <div key={userData.Organization?.name}>
                <div>Organization Name: {userData.Organization.name}</div>
              </div>
            ) : null}
            {userData?.team ? (
              <div key={userData.team.id}>
                <div>Team Name: {userData.team.name}</div>
              </div>
            ) : null}
          </div>
        </div>
      */}
      </CardContent>
    </Card>
  );
}
