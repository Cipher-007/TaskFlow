"use client";
import { FolderKanban, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import { Separator } from "./ui/separator";

export default function NavBar() {
  const [menuStatus, setMenuStatus] = useState(false);

  function menuStatusHandler() {
    setMenuStatus((prevState) => !prevState);
  }
  return (
    <nav className="flex h-14 items-center justify-between">
      <Link href="/home">
        <div className="flex gap-4 text-xl">
          <FolderKanban />
          Projectverse
        </div>
      </Link>
      <div className="lg:hidden">
        <button onClick={menuStatusHandler}>
          {menuStatus ? <X /> : <Menu />}
        </button>
      </div>
      {menuStatus && (
        <div className="absolute left-0 top-28 h-screen w-full bg-white p-8 text-black">
          <div className="flex flex-col gap-8 pt-10 text-2xl font-semibold">
            <Link href="/register">
              <div>Register</div>
            </Link>
            <Separator />
            <Link href="/signin">
              <div>Sign In</div>
            </Link>
          </div>
        </div>
      )}
      <div className="hidden gap-8 lg:flex">
        <Link href="/register" className="font-medium transition-colors">
          <Button>Register</Button>
        </Link>
        <Link href="/signin" className="font-medium transition-colors">
          <Button>Sign In</Button>
        </Link>
      </div>
    </nav>
  );
}
