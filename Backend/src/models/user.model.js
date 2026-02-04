import pool from "../config/db.js";

export const createUser = async ({ email, name, image, clerkId }) => {
  const result = await pool.query(
    `INSERT INTO users (email, name, image, clerk_id)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (clerk_id) DO NOTHING
     RETURNING *`,
    [email, name, image, clerkId]
  );
  return result.rows[0];
};

export const deleteUserByClerkId = async (clerkId) => {
  await pool.query("DELETE FROM users WHERE clerk_id = $1", [clerkId]);
};
