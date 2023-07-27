import { Project, TASK_STATUS, Task, User } from "@prisma/client";

type Prj = {
  name: string;
  description: string;
  due: string;
  status: TASK_STATUS;
  userId: number;
};
type Tsk = {
  name: string;
  description: string;
  due: string;
  projectId: string;
};

type FetcherProps = {
  url: string;
  method: string;
  body: Partial<User> | Partial<Project> | Prj | Tsk;
  json?: boolean;
};

async function fetcher({ url, method, body, json = true }: FetcherProps) {
  const res = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!res.ok) {
    throw new Error("API error");
  }

  if (json) {
    const data = await res.json();

    return data;
  }
}

export function register(user: Partial<User>) {
  return fetcher({
    url: "/api/register",
    method: "POST",
    body: user,
    json: false,
  });
}

export function signin(user: Partial<User>) {
  return fetcher({
    url: "/api/signin",
    method: "POST",
    body: user,
    json: false,
  });
}

export async function createNewProject(project: Prj) {
  return fetcher({
    url: "/api/projects",
    method: "POST",
    body: project,
    json: false,
  });
}

export async function createNewTask(task: Tsk) {
  return fetcher({
    url: "/api/tasks",
    method: "POST",
    body: task,
    json: false,
  });
}
