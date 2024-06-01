import React from "react";
import BottomNav from "~/components/bottom-nav";

export default function OrgLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="basis-[91.2%] px-2 pb-1 pt-2">{children}</div>
      <div className="fixed bottom-1 w-screen px-2">
        <BottomNav />
      </div>
    </div>
  );
}
