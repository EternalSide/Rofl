"use server";

import Question from "@/database/models/question.model";
import Answer from "@/database/models/answer.model";
import { revalidatePath } from "next/cache";
import connectToDatabase from "../mongoose";
import { CreateAnswerParams } from "./shared.types";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { author, content, question, path } = params;

    const newAnswer = await Answer.create({
      question,
      content,
      author,
    });

    const updatedQuestion = await Question.findByIdAndUpdate(question, { $push: { anwsers: newAnswer._id } });

    revalidatePath(path);
  } catch (e) {
    console.log(e);
  }
}
