"use client";

import { useState } from "react";
import { Menu } from "../menu";
import ProjectForm from "./project-form";
import { Project } from "@prisma/client";
import DeleteProject from "./delete-project";

export default function EditProject({
  project,
}: {
  project: Partial<Project>;
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const projectform = (
    <ProjectForm project={project} mode="edit" setToggle={setOpenEdit} />
  );
  const deleteProject = <DeleteProject />;

  return (
    <Menu
      title="Edit Project"
      setOpenEdit={setOpenEdit}
      openEdit={openEdit}
      form={projectform}
      openDelete={openDelete}
      setOpenDelete={setOpenDelete}
      deleteDialog={deleteProject}
    />
  );
}
