import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { CheckSquare, LayoutDashboard } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Projectverse",
  description: "One app to replace them all.",
};

export default function Home() {
  return (
    <div className="h-full w-full p-8">
      <NavBar />
      <div className="pb-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center pb-32 pt-60 font-extrabold tracking-tighter">
          <h1 className="pb-2 text-3xl lg:text-6xl">Welcome to ProjectVerse</h1>
          <p className="mb-4 text-xl lg:text-4xl">
            One app to replace them all.
          </p>
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
          width={1500}
          height={800}
          priority={true}
          className="mx-auto rounded-2xl border-8 border-white/20 shadow-2xl"
        />
      </div>
    </div>
  );
}
