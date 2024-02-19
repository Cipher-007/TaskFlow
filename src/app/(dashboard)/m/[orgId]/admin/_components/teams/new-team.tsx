"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import TeamForm from "./team-form";

export default function NewTeam() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center p-2 transition-all duration-200 ease-in-out hover:scale-105">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-1" />
            New Team
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Team</DialogTitle>
            <DialogDescription className="pt-2">
              Fill out the details below to initiate a new team.
            </DialogDescription>
          </DialogHeader>
          <TeamForm setToggle={setOpen} mode="create" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
