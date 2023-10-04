"use server";
import { Configuration, OpenAIApi } from "openai";
import connectToDatabase from "./mongoose";
import Answer from "@/database/models/answer.model";
import Question from "@/database/models/question.model";
import console from "console";

let DISABLED_NOTIFICATIONS: boolean = false;

interface ChappiProps {
  questionText: string;
  questionId: string;
}

// Чаппи отвечает на вопрос автоматически, только если пользователь имеет не больше 3 вопросов
//  и только если чаппи запросов меньше 3;
// Пока хардкод.
export default async function generateChappyAnswer(params: ChappiProps) {
  if (!process.env.OPENAI_API_KEY) console.log("Не добавлен ключ для OpenAI.");
  if (!DISABLED_NOTIFICATIONS) console.log("Чаппи в работе.");

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  if (!DISABLED_NOTIFICATIONS) console.log("OpenAI подключен.");

  try {
    connectToDatabase();
    if (!DISABLED_NOTIFICATIONS) console.log("Чаппи послал запрос к OpenAI. Ожидайте Ответа.");

    // Ответ От ChatGPT
    const { questionText, questionId } = params;
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Сейчас я спрошу тебя кое-что о программирование, весь ответ должен быть в Markdown html разметке, участки кода или примеров должны быть выделены , вот мой вопрос: ${questionText}`,
        },
      ],
    });

    const chappiAnswer = response.data?.choices[0]?.message?.content;
    if (!DISABLED_NOTIFICATIONS) console.log("Ответ получен, записываю в БД.");

    // Добавим в Бд Ответ от Chappi
    const newAnswer = await Answer.create({
      question: questionId,
      content: chappiAnswer,
      author: "651d4496ca6504af7ba2c7cf",
    });
    // Обновим исходный  вопрос
    await Question.findByIdAndUpdate(questionId, { $push: { anwsers: newAnswer._id } });

    if (!DISABLED_NOTIFICATIONS) console.log("Работа закончена, ответ добавлен.");
  } catch (e) {
    console.log(e);
  }
}
