"use client";
import { createNewProject } from "@/lib/api";
import { FormEvent, useState } from "react";
import Modal from "react-modal";
import ButtonC from "./Button";
import { Input } from "@/components/ui/input";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { da } from "date-fns/locale";

Modal.setAppElement("#modal");

export default function NewProject() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const due = date!.toISOString();

    const project = { name, description, due };

    await createNewProject(project);

    closeModal();
  }

  return (
    <div className="flex items-center justify-center px-6 py-8 transition-all duration-200 ease-in-out hover:scale-105">
      <ButtonC onClick={() => openModal()}>+ New Project</ButtonC>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-1/2 rounded-xl bg-white p-8"
      >
        <h1 className="mb-6 text-3xl">New Project</h1>
        <form
          className="flex flex-col items-center gap-1"
          onSubmit={submitHandler}
        >
          <Input
            className="mb-4"
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            className="mb-4"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick due date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button type="submit">Create</Button>
        </form>
      </Modal>
    </div>
  );
}
