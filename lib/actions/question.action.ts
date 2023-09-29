"use server";

import Question from "../models/question.model";
import connectToDatabase from "../mongoose";

interface createQuestionProps {
  title: string;
  explanation: string;
  tags: string[];
}

export async function createQuestion({ title, explanation, tags }: createQuestionProps) {
  try {
    await connectToDatabase();
    const newQuestion = await Question.create({
      title,
      explanation,
      tags,
    });
    console.log(newQuestion);
  } catch (error) {}
}
