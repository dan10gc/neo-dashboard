import { Pool } from "pg";
import { drizzle } from "drizzle-orm/postgres-js";

import * as schema from "./schema";
import { env } from "../config";

const pool = new Pool({ connectionString: env.DB.URL });

export const db = drizzle(pool, { schema });
