"use server";

import User from "@/database/models/user.model";
import connectToDatabase from "../mongoose";
import { GetAllTagsParams, GetTopUserTags } from "./shared.types";
import Tag from "@/database/models/tag.model";

export default async function getTopUserTags(params: GetTopUserTags) {
  try {
    connectToDatabase();

    const { userId, limit = 3 } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error("Пользователь не найден.");

    // * TODO: Выбрать 3 самых популярных Тега пользователя.
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

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const { page = 1, pageSize = 20, filter, searchQuery } = params;

    const tags = await Tag.find({}).sort({ createdAt: -1 });

    return { tags };
  } catch (e) {
    console.log(e);
    throw e;
  }
}
