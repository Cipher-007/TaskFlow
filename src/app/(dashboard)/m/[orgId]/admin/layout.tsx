import type { Metadata } from "next";
import { SidebarNav } from "~/components/sidebar-nav";
import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/server";

export const metadata: Metadata = {
  title: "Admin",
  description: "App settings",
};

interface AdminLayoutProps {
  children: React.ReactNode;
  params: { orgId: string };
}

export default async function AdminLayout({
  children,
  params,
}: AdminLayoutProps) {
  const user = await api.user.getCurrentUserInfo.query();

  let sidebarNavItems: { title: string; href: string }[] = [];

  if (user?.globalRole === "ADMIN") {
    sidebarNavItems = [
      {
        title: "Users",
        href: `/m/${params.orgId}/admin`,
      },
      {
        title: "Requests",
        href: `/m/${params.orgId}/admin/requests`,
      },
      {
        title: "Teams",
        href: `/m/${params.orgId}/admin/teams`,
      },
    ];
  } else {
    sidebarNavItems = [
      {
        title: "Users",
        href: `/m/${params.orgId}/admin`,
      },
    ];
  }

  return (
    <div className="h-full w-full space-y-6 rounded-md bg-white p-10 pb-16 dark:bg-black">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Admin</h2>
        <p className="text-muted-foreground">Manage your account settings.</p>
      </div>
      <Separator className="my-6" />
      <div className="flex h-[90%] flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="h-full w-full flex-1">{children}</div>
      </div>
    </div>
  );
}
