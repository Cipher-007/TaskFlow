"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export default function DeleteProject() {
  const projectId = usePathname().split("/")[2];
  const router = useRouter();
  const deleteProject = api.project.delete.useMutation({
    onSuccess: () => {
      router.push("/project");
    },
  });
  function deleteProjectHandler() {
    deleteProject.mutate({ id: projectId! });
  }

  return (
    <div>
      Are you sure you want to delete this project?
      <div className="flex justify-end gap-6 px-2 pt-8">
        <Button variant={"destructive"} onClick={deleteProjectHandler}>
          Delete
        </Button>
        <Button>Cancel</Button>
      </div>
    </div>
  );
}
