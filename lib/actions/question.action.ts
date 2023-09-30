"use server";

import Question from "@/database/models/question.model";
import connectToDatabase from "../mongoose";
import Tag from "@/database/models/tag.model";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";
import User from "@/database/models/user.model";
import { revalidatePath } from "next/cache";

export async function createQuestion(params: CreateQuestionParams) {
  try {
    await connectToDatabase();

    const { title, content, tags, author, path } = params;

    const newQuestion = await Question.create({
      title,
      content,
      author,
    });
    // * Массив тегов на добавление к посту.
    const tagDocuments = [];

    // * Теги поста, если есть, то тогда добавление поста, который с ним связан,
    // * Если нет, создадим новый.
    // * many to many relation
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        {
          $setOnInsert: { name: tag },
          $push: { questions: newQuestion._id },
        },
        { upsert: true, new: true },
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(newQuestion._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    revalidatePath(path);
  } catch (e) {
    console.log(e);
  }
}

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (e) {
    console.log(e);
    throw e;
  }
}
