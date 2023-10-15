import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default async function UserCard({ id }: { id: string }) {
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
    include: {
      Organization: {
        select: {
          name: true,
        },
      },
      team: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!user) {
    return (
      <div className="mx-32 w-full text-center text-3xl font-medium">
        User not found
      </div>
    );
  }
  return (
    <Card className="w-1/2">
      <CardHeader className="items-center">
        <CardTitle>{`${user?.firstName} ${user?.lastName}`}</CardTitle>
      </CardHeader>
      <CardContent className="text-2xl">
        <div>Email: {user.email}</div>
        <div>Contact No: {user.contact}</div>
        <div>Organization: {user.Organization.name}</div>
        {user.team && <div>Team: {user.team?.name}</div>}
      </CardContent>
    </Card>
  );
}
