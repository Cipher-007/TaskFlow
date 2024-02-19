import {  usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function DeleteTeam() {
  const teamId = usePathname().split("/")[2];
  const router = useRouter();
  async function deleteTeam() {
    const res = await fetch("/api/team", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: teamId }),
    });

    if (res.ok) {
      router.push("/admin/teams");
    }
  }

  return (
    <div>
      Are you sure you want to delete this team?
      <div className="flex justify-end gap-6 px-2 pt-8">
        <Button variant={"destructive"} onClick={deleteTeam}>
          Delete
        </Button>
        <Button>Cancel</Button>
      </div>
    </div>
  );
}
