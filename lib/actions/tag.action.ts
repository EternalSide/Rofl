"use server";

import User from "@/database/models/user.model";
import connectToDatabase from "../mongoose";
import { GetAllTagsParams, GetQuestionsByTagIdParams, GetTopUserTags } from "./shared.types";
import Tag, { ITag } from "@/database/models/tag.model";
import { redirect } from "next/navigation";
import Question from "@/database/models/question.model";
import { FilterQuery } from "mongoose";
import Answer from "@/database/models/answer.model";

export default async function getTopUserTags(params: GetTopUserTags) {
  try {
    connectToDatabase();

    const { userId, limit = 3 } = params;

    const user = await User.findById(userId);
    const id = user._id.toString();

    const answers = await Answer.find({ author: id }).populate({
      path: "question",
      model: Question,
      options: {
        populate: [
          {
            path: "tags",
            model: Tag,
            select: "name",
          },
        ],
      },
    });

    const tags = await answers.map((answer) => answer.question.tags.map((tag: any) => tag.name)).flat();

    tags.sort((a, b) => b.localeCompare(a));

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

    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    let sortOptions = {};

    switch (filter) {
      case "recent":
        sortOptions = { createdOn: -1 };
        break;

      case "popular":
        sortOptions = { questions: -1 };
        break;

      case "name":
        sortOptions = { name: 1 };
        break;

      case "old":
        sortOptions = { createdOn: 1 };
        break;

      default:
        break;
    }

    const tags = await Tag.find(query).sort(sortOptions);

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

export async function getPopularTags() {
  try {
    connectToDatabase();

    // const popularTags = await Tag.find({}).sort({ questionsLength: -1 }).limit(5);

    const popularTags = await Tag.aggregate([
      {
        $project: {
          name: 1,
          numberOfQuestions: {
            $size: "$questions",
          },
        },
      },
      {
        $sort: {
          numberOfQuestions: -1,
        },
      },
      { $limit: 5 },
    ]);

    return popularTags;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
