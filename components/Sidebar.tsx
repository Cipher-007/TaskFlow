"use client";
import { usePathname } from "next/navigation";
import { Card } from "./ui/card";
import clsx from "clsx";
import Link from "next/link";
import { CalendarDays, LayoutGrid, User, Settings } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Card className="flex h-full w-28 flex-wrap items-center justify-between rounded-3xl px-10 py-4 drop-shadow-xl">
      <Link href="/home" className="flex w-full items-center justify-center">
        <LayoutGrid
          className={clsx(
            "h-12 w-12 stroke-gray-400 transition duration-200 ease-in-out hover:stroke-violet-600",
            pathname === "/home" ? "stroke-violet-600" : null,
          )}
        />
      </Link>
      <Link
        href="/calendar"
        className="flex w-full items-center justify-center"
      >
        <CalendarDays
          className={clsx(
            "h-12 w-12 stroke-gray-400 transition duration-200 ease-in-out hover:stroke-violet-600",
            pathname === "/calendar" ? "stroke-violet-600" : null,
          )}
        />
      </Link>
      <Link href="/profile" className="flex w-full items-center justify-center">
        <User
          className={clsx(
            "h-12 w-12 stroke-gray-400 transition duration-200 ease-in-out hover:stroke-violet-600",
            pathname === "/user" ? "stroke-violet-600" : null,
          )}
        />
      </Link>
      <Link
        href="/settings"
        className="flex w-full items-center justify-center"
      >
        <Settings
          className={clsx(
            "h-12 w-12 stroke-gray-400 transition duration-200 ease-in-out hover:stroke-violet-600",
            pathname === "/settings" ? "stroke-violet-600" : null,
          )}
        />
      </Link>
    </Card>
  );
}
