"use client";

import { Menu } from "@/components/menu";
import TeamForm from "@/components/teams/team-form";
import type { Team } from "@prisma/client";
import { useState } from "react";
import DeleteTeam from "./delete-team";

export default function EditTeam({ team }: { team: Partial<Team> }) {
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
