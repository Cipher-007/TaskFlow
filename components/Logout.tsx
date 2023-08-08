"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export default function Logout() {
  const { toast } = useToast();
  const route = useRouter();
  async function logout() {
    const res = await fetch("/api/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      route.push("/");
      toast({
        title: "Logged out",
        description: "You have been logged out",
      });
    }
  }

  return <Button onClick={logout}>Logout</Button>;
}
