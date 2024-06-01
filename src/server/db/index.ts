import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

import { env } from "~/env.js";
import * as schema from "./schema";

const connectionString = env.DATABASE_URL;
const client = new Pool({ connectionString });

export const db = drizzle(client, { schema: schema });
