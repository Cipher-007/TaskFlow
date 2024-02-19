"use client";

import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { User } from "@prisma/client";
import ProfileForm from "./profile-form";

export default function EditProfile({ user }: { user: Partial<User> }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center justify-center p-4 transition-all duration-200 ease-in-out hover:scale-105">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Edit />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
            <DialogDescription className="pt-2">
              Fill out the details below to initiate a new project
            </DialogDescription>
          </DialogHeader>
          <ProfileForm user={user!} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
