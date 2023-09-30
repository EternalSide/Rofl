"use server";

import User from "@/database/models/user.model";
import connectToDatabase from "../mongoose";
import { GetTopUserTags } from "./shared.types";

export default async function getTopUserTags(params: GetTopUserTags) {
  try {
    connectToDatabase();

    const { userId, limit = 3 } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error("Пользователь не найден.");

    return [
      {
        _id: "1",
        name: "React",
      },
      {
        _id: "2",
        name: "Js",
      },
      {
        _id: "3",
        name: "Next",
      },
    ];
  } catch (e) {
    console.log(e);
    throw e;
  }
}
