import Question from "@/database/models/question.model";
import console from "console";

import OpenAI, { ChatCompletionRequestMessage, ChatCompletionResponseMessage, Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";
// * акк не работает
const configuration = new Configuration({
  organization: "org-EKZO7W6llLbYq7YnL8rhd1Pw",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const questionId = await req.json();

    const question = await Question.findById(questionId);

    const message = question.content;

    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: "Привет",
    });
    console.log(response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    console.log(error);
    return new NextResponse();
  }
}
