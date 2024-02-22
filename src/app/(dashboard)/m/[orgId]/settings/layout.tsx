import type { Metadata } from "next";
import { SidebarNav } from "~/components/sidebar-nav";
import { Separator } from "~/components/ui/separator";

export const metadata: Metadata = {
  title: "Settings",
  description: "Advanced form example using react-hook-form and Zod.",
};

interface SettingsLayoutProps {
  children: React.ReactNode;
  params: {
    orgId: string;
  };
}

export default function SettingsLayout({
  children,
  params,
}: SettingsLayoutProps) {
  const sidebarNavItems = [
    {
      title: "Profile",
      href: `/m/${params.orgId}/settings`,
    },
    {
      title: "Appearance",
      href: `/m/${params.orgId}/settings/appearance`,
    },
  ];

  return (
    <div className="h-full w-full space-y-6 rounded-md bg-white p-10 pb-16 dark:bg-black">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="w-full flex-1">{children}</div>
      </div>
    </div>
  );
}
