import type { User } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function Employee({ member }: { member: Partial<User> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{`${member.firstName} ${member.lastName}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Email : {member.email}</p>
        <p>Email : {member.contact}</p>
      </CardContent>
    </Card>
  );
}
