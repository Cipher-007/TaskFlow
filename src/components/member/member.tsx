import type { User } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default async function Member({ member }: { member: Partial<User> }) {
  return (
    <Card className="transition-all duration-200 ease-in-out hover:scale-105">
      <CardHeader>
        <CardTitle>{`${member.firstName} ${member.lastName}`}</CardTitle>
        <CardDescription>{member.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>{member.role}</div>
      </CardContent>
    </Card>
  );
}
