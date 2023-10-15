"use client";

import { usePathname } from "next/navigation";
import { Card } from "./ui/card";
import clsx from "clsx";
import Link from "next/link";
import {
  CalendarDays,
  LayoutGrid,
  User,
  Settings,
  FolderDot,
} from "lucide-react";
import { RequestStatus, UserRole } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Sidebar({
  status,
  role,
}: {
  status: RequestStatus;
  role: UserRole;
}) {
  const pathname = usePathname();

  const show = status === "APPROVED" ? true : false;

  const css =
    "h-12 w-12 stroke-gray-400 transition duration-200 ease-in-out hover:stroke-violet-600";

  return (
    <Card className="flex h-full w-28 flex-wrap items-center justify-between rounded-3xl px-10 py-4 drop-shadow-xl">
      {show && (
        <>
          <Link
            href="/home"
            className="flex w-full items-center justify-center"
          >
            <LayoutGrid
              className={clsx(
                css,
                pathname === "/home" ? "stroke-violet-600" : null,
              )}
            />
          </Link>
          <Link
            href="/project"
            className="flex w-full items-center justify-center"
          >
            <FolderDot
              className={clsx(
                css,
                pathname === "/calendar" ? "stroke-violet-600" : null,
              )}
            />
          </Link>
          <Link
            href="/calendar"
            className="flex w-full items-center justify-center"
          >
            <CalendarDays
              className={clsx(
                css,
                pathname === "/calendar" ? "stroke-violet-600" : null,
              )}
            />
          </Link>
        </>
      )}
      {(role === "TEAM_LEAD" || role === "ORGANIZATION_ADMIN") && (
        <Link href="/admin" className="flex w-full items-center justify-center">
          <User
            className={clsx(
              css,
              pathname === "/admin" ? "stroke-violet-600" : null,
            )}
          />
        </Link>
      )}
      <Link href="/profile" className="flex w-full items-center justify-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>
      <Link
        href="/settings"
        className="flex w-full items-center justify-center"
      >
        <Settings
          className={clsx(
            css,
            pathname === "/settings" ? "stroke-violet-600" : null,
          )}
        />
      </Link>
    </Card>
  );
}
