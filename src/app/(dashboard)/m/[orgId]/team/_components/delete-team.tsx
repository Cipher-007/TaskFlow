"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export default function DeleteTeam() {
  const teamId = usePathname().split("/")[2];
  const router = useRouter();
  const deleteTeam = api.team.delete.useMutation({
    onSuccess: () => {
      router.push("/admin/teams");
    },
  });

  return (
    <div>
      Are you sure you want to delete this team?
      <div className="flex justify-end gap-6 px-2 pt-8">
        <Button
          variant={"destructive"}
          onClick={() => {
            deleteTeam.mutate({ id: teamId! });
          }}
        >
          Delete
        </Button>
        <Button>Cancel</Button>
      </div>
    </div>
  );
}
