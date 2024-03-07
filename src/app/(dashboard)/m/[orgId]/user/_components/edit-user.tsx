"use client";

import { useState } from "react";
import type { Users } from "~/server/db/schema";
import { api } from "~/trpc/react";
import { Menu } from "../../_components/menu";
import DeleteUser from "./delete-user";
import UserForm from "./user-form";

export default function EditUser({ user }: { user: Users }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [teams, userTeams] = api.useQueries((t) => [
    t.team.getAll(user.organizationId!),
    t.team.getAllUserTeams(),
  ]);

  if (teams.isSuccess && userTeams.isSuccess) {
    const form = (
      <UserForm
        userId={user.id}
        setOpenEdit={setOpenEdit}
        teamsData={teams.data}
        userTeams={userTeams.data}
      />
    );
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
}
