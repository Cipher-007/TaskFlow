"use client";
import Link from "next/link";
import { Settings, User, Grid, Calendar, Icon } from "react-feather";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { SidebarLinkData } from "./Sidebar";

type SidebarLinkProps = {
  link: SidebarLinkData;
};

const icons = { Settings, User, Grid, Calendar };

export default function SidebarLink({ link }: SidebarLinkProps) {
  const pathname = usePathname();
  let isActive = false;

  if (pathname === link.link) {
    isActive = true;
  }

  const Icon: Icon = icons[link.icon as keyof typeof icons];
  return (
    <Link href={link.link} className="flex w-full items-center justify-center">
      <Icon
        size={40}
        className={clsx(
          "stroke-gray-400 transition duration-200 ease-in-out hover:stroke-violet-600",
          isActive && "stroke-violet-600",
        )}
      />
    </Link>
  );
}
