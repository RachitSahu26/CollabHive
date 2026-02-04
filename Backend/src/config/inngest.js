import { Inngest } from "inngest";
import { createUser, deleteUserByClerkId } from "../models/user.model.js";
import { connectDB } from "./db.js";

export const inngest = new Inngest({ id: "collav-hive" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();

    const { id, email_addresses, first_name, last_name, image_url } = event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      image: image_url,
    };

    await createUser(newUser);
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;
    await deleteUserByClerkId(id);
  }
);

export const functions = [syncUser, deleteUserFromDB];
