"use server";

import Question from "@/database/models/question.model";
import connectToDatabase from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/models/interaction.model";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    connectToDatabase();

    const { questionId, userId } = params;

    // Увеличить просмотры поста.
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    if (userId) {
      const existingInteraction = await Interaction.findOne({ user: userId, action: "view", question: questionId });

      if (existingInteraction) return;

      // Save User Action - для Системы Рекомендаций.
      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
