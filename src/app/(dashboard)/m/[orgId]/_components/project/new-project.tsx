"use client";

import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import ProjectForm from "./project-form";

export default function NewProject() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center pb-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="transition-all duration-200 ease-in-out hover:scale-105">
            <Plus className="mr-1" />
            New Project
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
            <DialogDescription className="pt-2">
              Fill out the details below to initiate a new project
            </DialogDescription>
          </DialogHeader>
          <ProjectForm setToggle={setOpen} mode="create" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
