"use client";

import { Button } from "@/components/ui/button";
import type { User } from "@prisma/client";
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
import { AddMember } from "./add-member";

export default function NewMember({ employees }: { employees: User[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center justify-center pt-4 transition-all duration-200 ease-in-out hover:scale-105">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Edit className="mr-1" />
            Edit Member
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Member</DialogTitle>
            <DialogDescription className="pt-2">
              Add a new member to your team.
            </DialogDescription>
          </DialogHeader>
          <AddMember employees={employees} setToggle={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
