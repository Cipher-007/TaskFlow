import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getInitials } from "~/lib/utils";
import { type Users } from "~/server/db/schema";

export default function Member({
  member,
}: {
  member: Omit<Users, "emailVerified">;
}) {
  return (
    <Card className="transition-all duration-200 ease-in-out hover:scale-105">
      <CardHeader>
        <div className="flex justify-between">
          <Avatar>
            <AvatarImage src={member.image!} />
            <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
          </Avatar>
          <CardTitle className="lg:text-xl">{member.name}</CardTitle>
        </div>
        <CardDescription>{member.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>{member.role}</div>
      </CardContent>
    </Card>
  );
}
