"use client";

import { Button } from "./ui/button";

export default function RejectButton({ userId }: { userId: string }) {
  async function clickHandler() {
    const res = await fetch("/api/reject", {
      method: "POST",
      body: JSON.stringify({ userId }),
    });
  }

  return (
    <Button onClick={clickHandler} className="m-2 w-full">
      Reject
    </Button>
  );
}
