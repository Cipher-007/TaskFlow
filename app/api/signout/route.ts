import { cookies } from "next/headers";

export async function POST() {
  cookies().delete(process.env.COOKIE_NAME!);
}
