import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function DeleteProject() {
  const projectId = usePathname().split("/")[2];
  const router = useRouter();
  async function deleteProject() {
    const res = await fetch("/api/projects", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: projectId }),
    });

    if (res.ok) {
      router.push("/project");
    }
  }

  return (
    <div>
      Are you sure you want to delete this project?
      <div className="flex justify-end gap-6 px-2 pt-8">
        <Button variant={"destructive"} onClick={deleteProject}>
          Delete
        </Button>
        <Button>Cancel</Button>
      </div>
    </div>
  );
}
