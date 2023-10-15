"use client";

import { useState } from "react";
import DeleteUser from "./delete-user";
import { Menu } from "../menu";
import type { Team, User } from "@prisma/client";
import UserForm from "./user-form";

export default function EditUser({
  teams,
  user,
}: {
  teams: Team[];
  user: User;
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const form = <UserForm teams={teams} setOpenEdit={setOpenEdit} user={user} />;
  const deleteUser = <DeleteUser />;

  return (
    <Menu
      title="Edit User"
      setOpenEdit={setOpenEdit}
      openEdit={openEdit}
      form={form}
      openDelete={openDelete}
      setOpenDelete={setOpenDelete}
      deleteDialog={deleteUser}
    />
  );
}
