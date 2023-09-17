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
    <div className="h-screen w-screen bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 p-4">
      <div className="flex h-full w-full items-center">
        <Sidebar />
        {children}
      </div>
      <div id="modal"></div>
      <Toaster />
    </div>
  );
}
