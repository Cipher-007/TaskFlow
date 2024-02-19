import { type Team } from "~/server/db/schema";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function TeamCard({ team }: { team: Team }) {
  return (
    <Card className="transition-all duration-200 ease-in-out hover:-translate-y-2">
      <CardHeader>
        <CardTitle>{team.name}</CardTitle>
        <CardDescription>{team.description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
