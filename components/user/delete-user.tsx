import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function DeleteUser() {
  const userId = usePathname().split("/")[2];
  const router = useRouter();
  async function deleteProject() {
    const res = await fetch("/api/user", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    });

    if (res.ok) {
      router.push("/admin");
    }
  }

  return (
    <div>
      Are you sure you want to delete this user?
      <div className="flex justify-end gap-6 px-2 pt-8">
        <Button variant={"destructive"} onClick={deleteProject}>
          Delete
        </Button>
        <Button>Cancel</Button>
      </div>
    </div>
  );
}
