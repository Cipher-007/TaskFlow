import React from "react";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { db } from "@/lib/db";
import { getUserFromCookie, validateJWT } from "@/lib/auth";
import { cookies } from "next/headers";
import Sidebar from "@/components/sidebar";

export default async function DashboardRootlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await validateJWT(
    cookies().get(process.env.COOKIE_NAME!)?.value!,
  );

  const data = await db.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      role: true,
      Request: {
        select: {
          status: true,
        },
      },
    },
  });

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 p-4">
      <div className="flex h-full w-full items-center">
        <Sidebar status={data?.Request[0].status!} role={data?.role!} />
        {children}
      </div>
      <Toaster />
    </div>
  );
}
