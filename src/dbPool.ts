import { Pool } from "pg";

// should be hidden using .env
// This is connecting to the DB created using the pgsql command line
export const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "api",
  password: "password",
  port: 5432,
});
export const secret = "Tgs5aG_^GH@lKmnN";
