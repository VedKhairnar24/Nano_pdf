import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

// Use a fallback for build time, but runtime needs DATABASE_URL if using DB.
// Since we are using MemStorage primarily, this is just to satisfy the project structure.
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL || "postgres://user:pass@localhost:5432/db" 
});
export const db = drizzle(pool, { schema });
