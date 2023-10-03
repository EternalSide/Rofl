"use server";

import Question from "@/database/models/question.model";
import connectToDatabase from "../mongoose";
import Tag from "@/database/models/tag.model";
import { CreateQuestionParams, GetQuestionByIdParams, GetQuestionsParams, QuestionVoteParams } from "./shared.types";
import User from "@/database/models/user.model";
import { revalidatePath } from "next/cache";

import console from "console";

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDatabase();

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

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    connectToDatabase();
    const { questionId } = params;
    const question = await Question.findById(questionId)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({ path: "author", model: User, select: "_id clerkId name picture username" })
      .sort({ createdAt: -1 });

    return question;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function createUpVote(params: QuestionVoteParams) {
  try {
    connectToDatabase();
    const { questionId, userId, path, hasDownVoted, hasUpVoted } = params;

    let updateQuery = {};

    if (hasUpVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasDownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true });

    if (!question) {
      throw new Error("Вопрос не найден.");
    }

    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function createDownVote(params: QuestionVoteParams) {
  try {
    connectToDatabase();
    const { questionId, userId, path, hasDownVoted, hasUpVoted } = params;

    let updateQuery = {};

    if (hasDownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasUpVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true });

    if (!question) {
      throw new Error("Вопрос не найден.");
    }

    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
