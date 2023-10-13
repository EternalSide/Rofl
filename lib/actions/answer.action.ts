"use server";

import Question from "@/database/models/question.model";
import Answer from "@/database/models/answer.model";
import { revalidatePath } from "next/cache";
import connectToDatabase from "../mongoose";
import { AnswerVoteParams, CreateAnswerParams, DeleteAnswerParams, GetAnswersParams } from "./shared.types";
import Interaction from "@/database/models/interaction.model";
import User from "@/database/models/user.model";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { author, content, question, path } = params;

    const newAnswer = await Answer.create({
      question,
      content,
      author,
    });

    const questionObject = await Question.findByIdAndUpdate(question, { $push: { anwsers: newAnswer._id } });

    await Interaction.create({
      user: author,
      action: "answer",
      question,
      answer: newAnswer._id,
      tags: questionObject.tags,
    });

    await User.findByIdAndUpdate(author, {
      $inc: { reputation: 10 },
    });

    revalidatePath(path);
  } catch (e) {
    console.log(e);
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId, sortBy, page = 1, pageSize = 2 } = params;
    const skipAmount = (page - 1) * pageSize;

    let sortOptions = {};

    switch (sortBy) {
      case "highestUpvotes":
        sortOptions = { upvotes: -1 };
        break;

      case "lowestUpvotes":
        sortOptions = { upvotes: 1 };
        break;

      case "recent":
        sortOptions = { createdAt: -1 };
        break;

      case "old":
        sortOptions = { createdAt: 1 };
        break;

      default:
        break;
    }

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture username")
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalAnswers = await Answer.countDocuments({ question: questionId });

    const isNext = totalAnswers > skipAmount + answers.length;

    return { answers, isNext };
  } catch (e) {
    console.log(e);
  }
}

export async function createUpVoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { answerId, userId, path, hasDownVoted, hasUpVoted } = params;

    let updateQuery = {};
    let updateReputation = {};
    let updateUserReputation = {};

    if (hasUpVoted) {
      updateQuery = { $pull: { upvotes: userId } };
      updateReputation = { $inc: { reputation: -5 } };
      updateUserReputation = { $inc: { reputation: -1 } };
    } else if (hasDownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
      updateReputation = { $inc: { reputation: 10 } };
      updateUserReputation = { $inc: { reputation: 2 } };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
      updateReputation = { $inc: { reputation: 5 } };
      updateUserReputation = { $inc: { reputation: 1 } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true });

    if (!answer) {
      throw new Error("Комментарий не найден.");
    }

    await User.findByIdAndUpdate(userId, updateUserReputation);

    await User.findByIdAndUpdate(answer.author, updateReputation);

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
    let updateReputation = {};
    let updateUserReputation = {};

    if (hasDownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
      updateReputation = { $inc: { reputation: 5 } };
      updateUserReputation = { $inc: { reputation: 1 } };
    } else if (hasUpVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
      updateReputation = { $inc: { reputation: -10 } };
      updateUserReputation = { $inc: { reputation: -2 } };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
      updateReputation = { $inc: { reputation: -5 } };
      updateUserReputation = { $inc: { reputation: -1 } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true });

    if (!answer) {
      throw new Error("Комментарий не найден.");
    }

    await User.findByIdAndUpdate(userId, updateUserReputation);

    await User.findByIdAndUpdate(answer.author, updateReputation);

    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function deleteAnswer(params: DeleteAnswerParams) {
  try {
    connectToDatabase();
    const { answerId, path } = params;

    const answer = await Answer.findByIdAndDelete(answerId);

    if (!answer) {
      throw new Error("Ответ не найден.");
    }

    // await answer.deleteOne({ _id: answerId });
    await Question.updateMany({ _id: answer.question }, { $pull: { anwsers: answerId } });
    await Interaction.deleteMany({ answer: answerId });

    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
