"use client";
import { FolderKanban } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex h-14 items-center justify-between">
      <div className="flex items-center gap-2 pl-4 text-xl">
        <FolderKanban />
        Projectverse
      </div>
    </nav>
  );
}
