export async function POST() {
  return new Response(null, {
    status: 200,
    headers: {
      "Set-Cookie": `${process.env.COOKIE_NAME}=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/;`,
    },
  });
}
