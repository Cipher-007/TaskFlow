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
import CommentForm from "./comment-form";

export default function NewComment() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center transition-all duration-200 ease-in-out hover:scale-105">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-1" />
            New Comment
          </Button>
        </DialogTrigger>
        <DialogContent className="pb-4 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Comment</DialogTitle>
            <DialogDescription className="pt-2">
              Fill out the details below to initiate a new comment
            </DialogDescription>
          </DialogHeader>
          <CommentForm setToggle={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
