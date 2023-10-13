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

    const tagDocuments = [];

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

    await Interaction.create({
      user: author,
      question: newQuestion._id,
      action: "ask_question",
      tags: tagDocuments,
    });

    await User.findByIdAndUpdate(author, {
      $inc: { reputation: 5 },
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

    const { searchQuery, filter, page = 1, pageSize = 10 } = params;

    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Question> = {};

    if (searchQuery) {
      query.$or = [
        {
          title: { $regex: new RegExp(searchQuery, "i") },
        },
      ];
    }

    let sortOptions = {};

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

    const questions = await Question.find(query)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);

    const totalQuestion = await Question.countDocuments(query);

    const isNext = totalQuestion > skipAmount + questions.length;

    return { questions, isNext };
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
    let updateReputation = {};
    let updateUserReputation = {};

    if (hasUpVoted) {
      updateQuery = { $pull: { upvotes: userId } };
      updateReputation = { $inc: { reputation: -10 } };
      updateUserReputation = { $inc: { reputation: -1 } };
    } else if (hasDownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
      updateReputation = { $inc: { reputation: 20 } };
      updateUserReputation = { $inc: { reputation: 2 } };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
      updateReputation = { $inc: { reputation: 10 } };
      updateUserReputation = { $inc: { reputation: 1 } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true });

    if (!question) {
      throw new Error("Вопрос не найден.");
    }

    // Author Reputation
    await User.findByIdAndUpdate(question.author, updateReputation);

    // User Reputation
    await User.findByIdAndUpdate(userId, updateUserReputation);

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
    let updateReputation = {};
    let updateUserReputation = {};

    if (hasDownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
      updateReputation = { $inc: { reputation: 10 } };
      updateUserReputation = { $inc: { reputation: 1 } };
    } else if (hasUpVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
      updateReputation = { $inc: { reputation: -20 } };
      updateUserReputation = { $inc: { reputation: -2 } };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
      updateReputation = { $inc: { reputation: -10 } };
      updateUserReputation = { $inc: { reputation: -1 } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true });

    if (!question) {
      throw new Error("Вопрос не найден.");
    }
    // Author Reputation.
    await User.findByIdAndUpdate(question.author, updateReputation);

    // User Reputation
    await User.findByIdAndUpdate(userId, updateUserReputation);

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
