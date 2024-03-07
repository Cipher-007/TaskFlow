"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export default function RejectButton({ userId }: { userId: string }) {
  const router = useRouter();
  const rejectRequest = api.requests.updateRequest.useMutation({
    onSuccess() {
      router.refresh();
    },
  });

  return (
    <Button
      onClick={() => {
        rejectRequest.mutate({ userId: userId, status: "REJECTED" });
      }}
      className="m-2 w-full"
    >
      Reject
    </Button>
  );
}
