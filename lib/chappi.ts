"use server";
import { Configuration, OpenAIApi } from "openai";
import connectToDatabase from "./mongoose";
import Answer from "@/database/models/answer.model";
import Question from "@/database/models/question.model";
import { ChappiProps } from "@/types";
/* 
   1.Чаппи добавляет ответ к вопросу автоматически после публикации.
   2.Чаппи подключается к OpenAI
   3.Чаппи лимит - 3 раза.
   4. Лимит должен быть описан в схеме и добавляться после записи ответа.
*/
export default async function generateChappyAnswer(params: ChappiProps) {
  // Выключить Уведомления о работе.
  let DISABLED_NOTIFICATIONS: boolean = false;

  if (!process.env.OPENAI_API_KEY) console.log("Не добавлен ключ для OpenAI.");
  if (!DISABLED_NOTIFICATIONS) console.log("Чаппи в работе.");

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  if (!DISABLED_NOTIFICATIONS) console.log("OpenAI подключен.");

  try {
    connectToDatabase();
    // Ответ От ChatGPT
    if (!DISABLED_NOTIFICATIONS) console.log("Послал запрос к OpenAI. Ожидайте Ответа.");

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

    const chatGPT_answer = response.data?.choices[0]?.message?.content;

    // Добавим в Бд Ответ от Chappi
    if (!DISABLED_NOTIFICATIONS) console.log("Ответ получен, записываю в БД.");

    const newAnswer = await Answer.create({
      question: questionId,
      content: chatGPT_answer,
      author: "651d4496ca6504af7ba2c7cf",
    });

    // Обновим исходный  вопрос
    await Question.findByIdAndUpdate(questionId, { $push: { anwsers: newAnswer._id } });

    if (!DISABLED_NOTIFICATIONS) return console.log("Ответ добавлен, работа закончена.");
  } catch (e) {
    console.log(e, "Чаппи сломался, что-то пошло не так.");
  }
}
