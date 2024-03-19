import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { Request, Users } from "~/server/db/schema";
import { api } from "~/trpc/server";
import Approve from "../approve/approve";
import RejectButton from "./reject-button";

export default async function RequestCard({
  request,
}: {
  request: Request & { user: Users };
}) {
  const { name, email } = request.user;
  const teams = await api.team.getAll(request.organizationId);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Email : {email}</p>
        <p>Status : {request.status}</p>
      </CardContent>
      <CardFooter>
        <Approve teams={teams} userId={request.userId} />
        <RejectButton userId={request.userId} />
      </CardFooter>
    </Card>
  );
}
