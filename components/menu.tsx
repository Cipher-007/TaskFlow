"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {
  openEdit: boolean;
  title: string;
  setOpenEdit: (toggle: boolean) => void;
  form: React.ReactNode;
  openDelete: boolean;
  setOpenDelete: (toggle: boolean) => void;
  deleteDialog: React.ReactNode;
};

export function Menu({
  openEdit,
  title,
  setOpenEdit,
  form,
  openDelete,
  setOpenDelete,
  deleteDialog,
}: Props) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
          <DialogTrigger className="w-full">
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Edit
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            {form}
          </DialogContent>
        </Dialog>
        <DropdownMenuSeparator />
        <Dialog open={openDelete} onOpenChange={setOpenDelete}>
          <DialogTrigger className="w-full">
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Delete
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete {title}</DialogTitle>
            </DialogHeader>
            {deleteDialog}
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
