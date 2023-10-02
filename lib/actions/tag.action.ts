"use server";

import User from "@/database/models/user.model";

import connectToDatabase from "../mongoose";
import { GetAllTagsParams, GetQuestionsByTagIdParams, GetTopUserTags } from "./shared.types";
import Tag, { ITag } from "@/database/models/tag.model";
import { redirect } from "next/navigation";
import Question from "@/database/models/question.model";
import { FilterQuery } from "mongoose";

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

export async function getTagQuestion(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();

    const { page = 1, pageSize = 20, tagName, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { name: tagName };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery ? { title: { $regex: searchQuery, $options: "i" } } : {},
      options: {
        sort: {
          createdAt: -1,
        },
        populate: [
          {
            path: "tags",
            model: Tag,
            select: "_id name",
          },
          {
            path: "author",
            model: User,
          },
        ],
      },
    });

    if (!tag) redirect("/tags");

    const tagQuestions = tag.questions;
    return { tagQuestions };
  } catch (e) {
    console.log(e);
    throw e;
  }
}
