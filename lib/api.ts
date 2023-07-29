import { TASK_STATUS, User } from "@prisma/client";

type Project = {
  name: string;
  description: string;
  due: string;
};

type Task = {
  name: string;
  description: string;
  due: string;
  status: TASK_STATUS;
  projectId: string;
};

type FetcherProps = {
  url: string;
  method: string;
  body: Partial<User> | Project | Task;
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

export async function createNewProject(project: Project) {
  return fetcher({
    url: "/api/projects",
    method: "POST",
    body: project,
    json: false,
  });
}

export async function createNewTask(task: Task) {
  return fetcher({
    url: "/api/tasks",
    method: "POST",
    body: task,
    json: false,
  });
}
