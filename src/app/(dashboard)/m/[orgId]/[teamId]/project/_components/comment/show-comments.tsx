"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";

export default function ShowComments({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showComments, setShowComments] = useState(false);
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <Button
        onClick={() => setShowComments(!showComments)}
        className="text-sm"
      >
        {showComments ? "Hide Comments" : "Show Comments"}
      </Button>
      {showComments && children}
    </div>
  );
}
