"use client";

import { api } from "~/trpc/react";
import clsx from "clsx";
import {
  CalendarDays,
  FolderDot,
  LayoutGrid,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card } from "./ui/card";
import UserAvatar from "./user/user-avatar";

export default function Sidebar() {
  const pathname = usePathname();

  const orgId = pathname.split("/")[2];

  const { data, isSuccess } = api.user.getCurrentUserInfo.useQuery();

  const css =
    "h-10 w-10 stroke-gray-400 transition duration-200 ease-in-out hover:stroke-violet-600";

  return (
    <Card className="flex h-20 w-full items-center justify-around rounded-2xl">
      {isSuccess && data?.onboarded && (
        <>
          <Link
            href={`/m/${orgId}`}
            className="flex items-center justify-center"
          >
            <LayoutGrid
              className={clsx(
                css,
                pathname === `/m/${orgId}` ? "stroke-violet-600" : null,
              )}
            />
          </Link>
          <Link
            href={`/m/${orgId}/project`}
            className="flex items-center justify-center"
          >
            <FolderDot
              className={clsx(
                css,
                pathname === `/m/${orgId}/project` ? "stroke-violet-600" : null,
              )}
            />
          </Link>
          <Link
            href={`/m/${orgId}/calendar`}
            className="flex items-center justify-center"
          >
            <CalendarDays
              className={clsx(
                css,
                pathname === `/m/${orgId}/calendar`
                  ? "stroke-violet-600"
                  : null,
              )}
            />
          </Link>
        </>
      )}
      {((isSuccess && data?.role === "TEAM_LEAD") ||
        data?.globalRole === "ADMIN") && (
        <Link
          href={`/m/${orgId}/admin`}
          className="flex items-center justify-center"
        >
          <User
            className={clsx(
              css,
              pathname.startsWith(`/m/${orgId}/admin`)
                ? "stroke-violet-600"
                : null,
            )}
          />
        </Link>
      )}
      <Link
        href={`/m/${orgId}/profile`}
        className="flex items-center justify-center"
      >
        <UserAvatar />
      </Link>
      <Link
        href={`/m/${orgId}/settings`}
        className="flex items-center justify-center"
      >
        <Settings
          className={clsx(
            css,
            pathname.startsWith(`/m/${orgId}/settings`)
              ? "stroke-violet-600"
              : null,
          )}
        />
      </Link>
    </Card>
  );
}
