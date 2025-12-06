import { Inngest } from "inngest";
import { connectDB } from "../config/db.js";
import User from "../models/user.model.js";

export const inngest = new Inngest({ id: "simple-auth" });

// Your new function:
const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();

    const { email_addresses,first_name,id,image_url,last_name } = event.data;

    const newUser = new User({
      name: `${first_name || ""} ${last_name || ""}`,
      email: email_addresses[0]?.email_address,
      profileImage: image_url,
      clerkId: id,
    });

    await newUser.save();

  },
);

const deleteUser = inngest.createFunction(
  { id: "delete-user" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();

    const {id} = event.data;

    await User.deleteOne({ clerkId: id});

  },
);

// Add the function to the exported array:
export const functions = [
  syncUser,
  deleteUser
];