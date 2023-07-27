"use client";

import { TASK_STATUS } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { FormEvent, useState } from "react";
import Modal from "react-modal";
import DatePicker from "./DatePicker";
import { Button } from "./ui/button";
import { createNewTask } from "@/lib/api";
import { usePathname } from "next/navigation";

Modal.setAppElement("#modal");

export default function NewTask() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [status, setStatus] = useState<TASK_STATUS>(TASK_STATUS.NOT_STARTED);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const pathname = usePathname();

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const task = {
      name,
      description,
      due: date!.toISOString(),
      status,
      projectId: pathname.split("/")[2],
    };

    console.log(task);

    await createNewTask(task);

    closeModal();
  }

  function dateHandler(date: Date | undefined) {
    setDate(date);
  }
  return (
    <div className="mt-4">
      <div className="flex justify-center">
        <Button onClick={() => openModal()}>Create New</Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-[390px] rounded-xl bg-white p-5"
      >
        <Card className="w-[350px]">
          <CardHeader className="items-center">
            <CardTitle>Create Task</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitHandler}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    className="mb-4"
                    placeholder="Task name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input
                    className="mb-4"
                    placeholder="Task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <DatePicker onStateChange={dateHandler} stateValue={date} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Select
                    onValueChange={(e) => setStatus(e)}
                    defaultValue={TASK_STATUS.NOT_STARTED}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Project Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                        <SelectItem value="NOT_STARTED">NOT_STARTED</SelectItem>
                        <SelectItem value="STARTED">STARTED</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-center">
                  <Button type="submit">Submit</Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
}
