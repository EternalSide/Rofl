"use server";

import Question from "@/database/models/question.model";
import connectToDatabase from "../mongoose";
import { SearchParams } from "./shared.types";
import Answer from "@/database/models/answer.model";
import User from "@/database/models/user.model";
import Tag from "@/database/models/tag.model";

export const globalSearch = async (params: SearchParams) => {
  try {
    await connectToDatabase();

    const { query, type } = params;

    const regexQuery = { $regex: query, $options: "i" };

    let results = [];

    const modelsAndTypes = [
      {
        model: Question,
        searchField: "title",
        type: "question",
        rutype: "Вопрос",
      },
      {
        model: User,
        searchField: "name",
        type: "user",
        rutype: "Пользователь",
      },
      {
        model: Answer,
        searchField: "content",
        type: "answer",
        rutype: "Комментарий",
      },
      {
        model: Tag,
        searchField: "name",
        type: "tag",
        rutype: "Тег",
      },
    ];

    const typeLower = type?.toLowerCase();

    const generateId = (fieldName: string, item: any) => {
      switch (fieldName) {
        case "user":
          return item.username;

        case "answer":
          return item.question;

        case "question":
          return item._id;

        case "tag":
          return item.name;

        default:
          return null;
      }
    };

    const generateRuName = (fieldName: string, item: any) => {
      switch (fieldName) {
        case "user":
          return "Пользователь";

        case "answer":
          return "Комментарий";

        case "question":
          return "Вопрос";

        case "tag":
          return "Тег";

        default:
          return "";
      }
    };

    const SearchableTypes = ["question", "answer", "user", "tag"];

    // - Без фильтров.
    // Поиск по всем моделям.
    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model.find({ [searchField]: regexQuery }).limit(2);

        results.push(
          ...queryResults.map((item) => ({
            title: type === "answer" ? `Найденный комментарий: ${query}` : item[searchField],
            type,
            ruName: generateRuName(type!, item),
            id: generateId(type, item),
          })),
        );
      }
    } else {
      // - Если выбран фильтр и модель.
      // Поиск по одной модели.
      const modelInfo = modelsAndTypes.find((item) => item.type === type);

      if (!modelInfo) {
        throw new Error("Модель не совпадает.");
      }

      const queryResults = await modelInfo.model.find({ [modelInfo.searchField]: regexQuery }).limit(8);

      results = queryResults.map((item) => ({
        title: type === "answer" ? `Найденный комментарий: ${query}` : item[modelInfo.searchField],
        type,
        ruName: generateRuName(type!, item),
        id: generateId(type!, item),
      }));
    }

    return JSON.stringify(results);
  } catch (e) {
    console.log(e);
    throw e;
  }
};
