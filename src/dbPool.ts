import { Pool } from "pg";

// should be hidden using .env
// This is connecting to the DB created using the pgsql command line
export const pool = new Pool({
  user: process.env.POSTGRES_USER || "freddie",
  host: "localhost",
  database: "postgres",
  password: process.env.POSTGRES_PW || "freddielovescake",
  port: 5432,
});

export const secret = process.env.JWT_SECRET || "dev_secret123";
