"use client";

import { Edit } from "lucide-react";
import { usePathname } from "next/navigation";
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
import { api } from "~/trpc/react";
import AddMember from "./add-member";

export default function NewMember() {
  const [open, setOpen] = useState(false);
  const orgId = usePathname().split("/")[2];

  const { data, isLoading, error } =
    api.organization.getApprovedEmployees.useQuery(orgId!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return "An error has occurred: " + error.message;
  }

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
          <AddMember setToggle={setOpen} data={data} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
