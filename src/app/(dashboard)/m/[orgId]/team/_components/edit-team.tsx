"use client";

import { useState } from "react";
import type { Team } from "~/server/db/schema";
import DeleteTeam from "./delete-team";
import { Menu } from "../../_components/menu";
import TeamForm from "../../admin/_components/teams/team-form";

export default function EditTeam({ team }: { team: Team }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const teamForm = <TeamForm team={team} mode="edit" setToggle={setOpenEdit} />;
  const deleteTeam = <DeleteTeam />;
  return (
    <Menu
      title="Edit Team"
      setOpenEdit={setOpenEdit}
      openEdit={openEdit}
      form={teamForm}
      openDelete={openDelete}
      setOpenDelete={setOpenDelete}
      deleteDialog={deleteTeam}
    />
  );
}
