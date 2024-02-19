"use client";
import type { Team } from "@prisma/client";
import { useState } from "react";
import ApproveForm from "./approve-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function Approve({
  teams,
  userId,
}: {
  teams: Team[];
  userId: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="m-2 w-full">Approve</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription className="pt-2">
            Fill out the details below to assign project
          </DialogDescription>
        </DialogHeader>
        <ApproveForm teams={teams} id={userId} setToggle={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
