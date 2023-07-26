async function fetcher({ url, method, body, json = true }) {
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
    return data.data;
  }
  return res.json();
}

export function register(user) {
  return fetcher({
    url: "/api/register",
    method: "POST",
    body: user,
  });
}

export function signin(user) {
  return fetcher({
    url: "/api/signin",
    method: "POST",
    body: user,
  });
}
