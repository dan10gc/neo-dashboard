import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema.js";
import { env } from "../config.js";

const pool = new Pool({ connectionString: env.DB.URL });

export const db = drizzle(pool, { schema });
