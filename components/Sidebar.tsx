import Card from "./Card";
import SidebarLink from "./SidebarLink";

export type SidebarLinkData = {
  label: string;
  icon: string;
  link: string;
};

const links: SidebarLinkData[] = [
  { label: "Home", icon: "Grid", link: "/home" },
  {
    label: "Calendar",
    icon: "Calendar",
    link: "/calendar",
  },
  { label: "Profile", icon: "User", link: "/profile" },
  {
    label: "Settings",
    icon: "Settings",
    link: "/settings",
  },
];

export default function Sidebar() {
  return (
    <Card className="flex h-full w-28 flex-wrap items-center justify-between">
      {links.map((link) => (
        <SidebarLink link={link} key={link.label} />
      ))}
    </Card>
  );
}
