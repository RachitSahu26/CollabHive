import pkg from "pg";
import { ENV } from "./env.js";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Neon
  },
});

export const connectDB = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Neon PostgreSQL connected at:", res.rows[0].now);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default pool;
