import GlassPane from "@/components/GlassPane";
import React from "react";
import "@/styles/globals.css";
import Sidebar from "@/components/Sidebar";

export default function DashboardRootlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="candy-mesh h-screen w-screen p-4">
        <GlassPane className="flex h-full w-full items-center">
          <Sidebar />
          {children}
        </GlassPane>
        <div id="modal"></div>
      </body>
    </html>
  );
}
