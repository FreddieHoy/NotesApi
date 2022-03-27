import { Pool } from "pg";

// should be hidden using .env
// This is connecting to the DB created using the pgsql command line
export const pool = new Pool({
  user: process.env.DB_USER || "me",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "api",
  password: process.env.DB_PASS || "password", // TODO ADD TO >.env
  port: 5432,
});

export const secret = process.env.JWT_SECRET || "dev_secret123";
