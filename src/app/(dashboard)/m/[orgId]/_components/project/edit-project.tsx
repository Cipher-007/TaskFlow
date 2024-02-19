"use client";

import { useState } from "react";
import type { Project } from "~/server/db/schema";
import { Menu } from "../menu";
import ProjectForm from "./project-form";
import DeleteProject from "./delete-project";

export default function EditProject({ project }: { project: Project }) {
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
