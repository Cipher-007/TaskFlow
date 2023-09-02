import GlassPane from "@/components/GlassPane";
import React from "react";
import "@/styles/globals.css";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardRootlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="candy-mesh h-screen w-screen p-4">
      <GlassPane className="flex h-full w-full items-center">
        <Sidebar />
        {children}
      </GlassPane>
      <div id="modal"></div>
      <Toaster />
    </div>
  );
}
