"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export default function DeleteUser() {
  const userId = usePathname().split("/")[2];
  const router = useRouter();
  const deleteUser = api.user.delete.useMutation({
    onSuccess() {
      router.push("/admin");
    },
  });

  return (
    <div>
      Are you sure you want to delete this user?
      <div className="flex justify-end gap-6 px-2 pt-8">
        <Button
          variant={"destructive"}
          onClick={() => {
            deleteUser.mutate({ id: userId! });
          }}
        >
          Delete
        </Button>
        <Button>Cancel</Button>
      </div>
    </div>
  );
}
