"use server";
import Question from "@/database/models/question.model";
import { faker } from "@faker-js/faker";
import console from "console";
import { createQuestion } from "./question.action";
// Функции для Добавления тестовых данных.

export const sendSomeFakeData = async (count: number) => {
  try {
    for (let i = 0; i <= count; i++) {
      await createQuestion({
        title: `[Тест Вопрос] - ${faker.person.bio()}`,
        content: `Описание сгенерировано библиотекой Faker - ${faker.person.bio()}`,
        tags: ["next", "react", "js"],
        author: "651bd39342d3c3d3d7409ace",
        path: "/",
      });
    }
  } catch (e) {
    console.log(e);
  }
};
