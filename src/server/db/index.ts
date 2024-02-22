// import { neonConfig, Pool } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/neon-serverless";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "~/env.js";
import * as schema from "./schema";

// neonConfig.fetchConnectionCache = true;

// const pool = new Pool({ connectionString: env.DATABASE_URL });

const connectionString = env.DATABASE_URL;
const client = neon(connectionString);

// export const db = drizzle(pool, { schema });

export const db = drizzle(client, { schema: schema });
