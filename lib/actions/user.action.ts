"use server";

import User from "@/database/models/user.model";
import connectToDatabase from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedPostsParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import Question from "@/database/models/question.model";
import Tag from "@/database/models/tag.model";
import Answer from "@/database/models/answer.model";

export async function getUserById(params: { userId: string | null }) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (e) {
    console.log(e);
  }
}

export async function getUserByIdForProfile(params: { username: string }) {
  try {
    connectToDatabase();

    const { username } = params;

    const user = await User.findOne({ username });
    if (!user) {
      return null;
    }

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    return { user, totalQuestions, totalAnswers };
  } catch (e) {
    console.log(e);
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updatedData, path } = params;

    await User.findOneAndUpdate({ clerkId: clerkId }, updatedData, { new: true });

    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error("Пользователь не найден.");
    }

    // * Посты пользователя.
    const userQuestionIds = await Question.find({ author: user._id }).distinct("_id");

    // * Удалить все посты пользователя
    await Question.deleteMany({ author: user._id });

    // * Удалить Пользователя
    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();

    const { page = 1, pageSize = 20, filter, searchQuery } = params;

    const users = await User.find({}).sort({ createdAt: -1 });

    return { users };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function ToggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();
    const { questionId, userId, path } = params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("Пользователь не найден.");
    }

    const isPostSaved = user.savedPosts.includes(questionId);

    if (isPostSaved) {
      await User.findByIdAndUpdate(userId, { $pull: { savedPosts: questionId } }, { new: true });
    } else {
      await User.findByIdAndUpdate(userId, { $addToSet: { savedPosts: questionId } }, { new: true });
    }

    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getSavedPosts(params: GetSavedPostsParams) {
  try {
    connectToDatabase();

    const { clerkId, page = 1, pageSize = 20, filter, searchQuery } = params;

    const query: FilterQuery<typeof Question> = searchQuery ? { title: { $regex: new RegExp(searchQuery, "i") } } : {};

    const user = await User.findOne({ clerkId }).populate({
      path: "savedPosts",
      match: query,
      options: {
        sort: {
          createdAt: -1,
        },
        populate: [
          { path: "tags", model: Tag, select: "_id name" },
          { path: "author", model: User, select: "_id name picture clerkId username" },
        ],
      },
    });

    if (!user) {
      throw new Error("Пользователь не найден");
    }
    const savedQuestions = user.savedPosts;
    return { questions: savedQuestions };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    connectToDatabase();
  } catch (e) {
    console.log(e);
    throw e;
  }
}
