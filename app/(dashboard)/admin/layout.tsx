import { SidebarNav } from "@/components/sIdebar-nav";
import { Separator } from "@/components/ui/separator";
import { getUserFromCookie } from "@/lib/auth";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Admin",
  description: "App settings",
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const user = await getUserFromCookie(cookies());

  let sidebarNavItems: { title: string; href: string }[] = [];

  if (user!.role === "ORGANIZATION_ADMIN") {
    sidebarNavItems = [
      {
        title: "Users",
        href: "/admin",
      },
      {
        title: "Requests",
        href: "/admin/requests",
      },
      {
        title: "Teams",
        href: "/admin/teams",
      },
    ];
  } else {
    sidebarNavItems = [
      {
        title: "Users",
        href: "/admin",
      },
    ];
  }

  return (
    <div className="ml-4 h-[98%] w-full space-y-6 rounded-md bg-white p-10 pb-16 dark:bg-black">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Admin</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="h-full w-full flex-1">{children}</div>
      </div>
    </div>
  );
}
