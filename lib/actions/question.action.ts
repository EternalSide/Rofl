"use server";

import Question from "@/database/models/question.model";
import connectToDatabase from "../mongoose";
import Tag from "@/database/models/tag.model";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
} from "./shared.types";
import User from "@/database/models/user.model";
import { revalidatePath } from "next/cache";

import console from "console";
import { redirect } from "next/navigation";
import Answer from "@/database/models/answer.model";
import Interaction from "@/database/models/interaction.model";
import { FilterQuery } from "mongoose";

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

    const id = newQuestion._id.toString();

    await Question.findByIdAndUpdate(id, {
      $push: { tags: { $each: tagDocuments } },
    });

    revalidatePath(path);
    return id;
  } catch (e) {
    console.log(e);
  }
}

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter } = params;

    const query: FilterQuery<typeof Question> = {};
    let sortOptions = {};

    if (searchQuery) {
      query.$or = [
        {
          title: { $regex: new RegExp(searchQuery, "i") },
        },
      ];
    }

    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;

      case "frequent":
        sortOptions = { views: -1 };
        break;

      case "unanswered":
        query.anwsers = { $size: 0 };
        break;

      default:
        break;
    }

    if (filter) {
      if (filter === "unanswered") {
        sortOptions = { "anwsers.length": 0 };
      }
    }

    const questions = await Question.find(query)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort(sortOptions);

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
    redirect("/");
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

export async function deleteQuestion(params: DeleteQuestionParams) {
  try {
    connectToDatabase();
    const { questionId, path } = params;

    await Question.findByIdAndDelete(questionId);
    await Answer.deleteMany({ question: questionId });
    await Interaction.deleteMany({ question: questionId });
    await Tag.updateMany({ questions: questionId }, { $pull: { questions: questionId } });

    // await User.findByIdAndUpdate(authorId, { $pull: { questions: questionId } }, { new: true });

    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function editQuestion(params: EditQuestionParams) {
  try {
    connectToDatabase();
    const { questionId, title, content, path } = params;

    const question = await Question.findById(questionId).populate("tags");
    if (!question) {
      throw new Error("Вопрос не найден.");
    }
    question.title = title;
    question.content = content;
    await question.save();

    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getPopularQuestions() {
  try {
    connectToDatabase();

    const popularQuestions = await Question.find({}).sort({ views: -1, upvotes: -1 }).limit(5).select("_id title");

    return popularQuestions;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
