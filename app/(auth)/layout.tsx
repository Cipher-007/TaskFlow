import GlassPane from "@/components/GlassPane";
import React from "react";
import "@/styles/globals.css";

export default function AuthRootlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="rainbow-mesh h-screen w-screen p-6">
        <GlassPane className="flex h-full w-full items-center justify-center">
          {children}
        </GlassPane>
      </body>
    </html>
  );
}
