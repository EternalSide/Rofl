"use server";

import Question from "@/database/models/question.model";
import Answer from "@/database/models/answer.model";
import { revalidatePath } from "next/cache";
import connectToDatabase from "../mongoose";
import { AnswerVoteParams, CreateAnswerParams, GetAnswersParams } from "./shared.types";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { author, content, question, path } = params;

    const newAnswer = await Answer.create({
      question,
      content,
      author,
    });

    await Question.findByIdAndUpdate(question, { $push: { anwsers: newAnswer._id } });

    revalidatePath(path);
  } catch (e) {
    console.log(e);
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId } = params;

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture username")
      .sort({ createdAt: -1 });

    return { answers };
  } catch (e) {
    console.log(e);
  }
}

export async function createUpVoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { answerId, userId, path, hasDownVoted, hasUpVoted } = params;

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

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true });

    if (!answer) {
      throw new Error("Комментарий не найден.");
    }

    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
export async function createDownVoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { answerId, userId, path, hasDownVoted, hasUpVoted } = params;

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

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true });

    if (!answer) {
      throw new Error("Комментарий не найден.");
    }

    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
