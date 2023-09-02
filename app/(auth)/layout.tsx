import GlassPane from "@/components/GlassPane";
import React from "react";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

export default function AuthRootlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="rainbow-mesh h-screen w-screen p-6">
        <GlassPane className="flex h-full w-full items-center justify-center">
          {children}
        </GlassPane>
        <Toaster />
      </div>
  );
}
