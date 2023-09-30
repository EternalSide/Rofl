"use server";

import User from "@/database/models/user.model";
import connectToDatabase from "../mongoose";

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (e) {
    console.log(e);
  }
}
