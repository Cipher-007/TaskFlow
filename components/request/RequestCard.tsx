import type { Request, User } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Approve from "../approve/approve";
import { db } from "@/lib/db";
import RejectButton from "../reject-button";

export default async function RequestCard({
  request,
}: {
  request: Partial<Request> & { user: Partial<User> };
}) {
  const { firstName, lastName, email, id } = request.user;
  const teams = await db.team.findMany({
    where: {
      organizationId: request.organizationId,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{`${firstName} ${lastName}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Email : {email}</p>
        <p>Status : {request.status}</p>
      </CardContent>
      <CardFooter>
        <Approve teams={teams} userId={id!} />
        <RejectButton userId={id!} />
      </CardFooter>
    </Card>
  );
}
