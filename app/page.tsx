import { Button } from "@/components/ui/button";
import { CheckSquare, FolderKanban, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Projectverse",
  description: "One app to replace them all.",
};

export default function Home() {
  return (
    <div className="candy-mesh h-screen w-screen p-4">
      <nav className="flex h-14 items-center">
        <Link href="/home">
          <div className="absolute left-0 ml-8 flex gap-4 text-xl">
            <FolderKanban />
            Projectverse
          </div>
        </Link>
        <div className="absolute right-0 mr-8 flex gap-8">
          <Link href="/register" className="font-medium transition-colors">
            <Button>Register</Button>
          </Link>
          <Link href="/signin" className="font-medium transition-colors">
            <Button>Sign In</Button>
          </Link>
        </div>
      </nav>
      <div className="-mt-16 flex h-full flex-row items-center">
        <div className="my-auto flex basis-1/2 flex-col items-center">
          <p className="mb-4 text-3xl">One app to replace them all.</p>
          <div>
            <Button className="m-2">
              <span className="mr-1">Tasks</span>
              <CheckSquare />
            </Button>
            <Button className="m-2">
              <span className="mr-1">Dashboard</span>
              <LayoutDashboard />
            </Button>
          </div>
        </div>
        <Image
          src="/demo.png"
          alt="demo"
          sizes="100vw"
          width={500}
          height={300}
          className="mr-16 h-auto w-1/2 rounded-2xl shadow-2xl"
        />
      </div>
    </div>
  );
}
