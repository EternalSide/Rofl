"use server";

import User from "@/database/models/user.model";
import connectToDatabase from "../mongoose";

export async function getLastUsers() {
  try {
    connectToDatabase();

    const users = await User.find({})
      .sort({
        createdAt: -1,
      })
      .limit(3);

    return users;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
