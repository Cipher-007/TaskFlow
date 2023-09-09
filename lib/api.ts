import type { Project, User, Task } from "@prisma/client";
import { ProfileFormValues } from "./zod";

type createNewProjectProps = {
  title: string;
  description: string;
  due: string;
};

type FetcherProps = {
  url: string;
  method: string;
  body:
    | Partial<User>
    | createNewProjectProps
    | Partial<Task>
    | Partial<ProfileFormValues>;
};

async function fetcher({ url, method, body }: FetcherProps) {
  return await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    ...(body && { body: JSON.stringify(body) }),
  });
}

export function register(user: Partial<User>) {
  return fetcher({
    url: "/api/register",
    method: "POST",
    body: user,
  });
}

export function signin(user: Partial<User>) {
  return fetcher({
    url: "/api/signin",
    method: "POST",
    body: user,
  });
}

export async function createNewProject(project: Partial<Project>) {
  return fetcher({
    url: "/api/projects",
    method: "POST",
    body: { ...project, due: project.due?.toISOString() },
  });
}

export async function createNewTask(task: Partial<Task>) {
  return fetcher({
    url: "/api/tasks",
    method: "POST",
    body: task,
  });
}

export async function updateTask(task: Partial<Task>) {
  return fetcher({
    url: "/api/tasks",
    method: "PUT",
    body: task,
  });
}

export async function updateProfile(user: Partial<ProfileFormValues>) {
  return fetcher({
    url: "/api/profile",
    method: "PUT",
    body: user,
  });
}
