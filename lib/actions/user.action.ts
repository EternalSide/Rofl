"use server";

import User from "@/database/models/user.model";
import connectToDatabase from "../mongoose";
import { CreateUserParams, DeleteUserParams, UpdateUserParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/models/question.model";

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
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

    const updatedUser = await User.findOneAndUpdate({ clerkId: clerkId }, updatedData, { new: true });

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
