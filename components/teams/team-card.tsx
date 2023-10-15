import type { Team } from "@prisma/client";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function TeamCard({ team }: { team: Team }) {
  return (
    <Card className="transition-all duration-200 ease-in-out hover:scale-105">
      <CardHeader>
        <CardTitle>{team.name}</CardTitle>
        <CardDescription>{team.description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
