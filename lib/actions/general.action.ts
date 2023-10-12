"use server";

import Question from "@/database/models/question.model";
import connectToDatabase from "../mongoose";
import { SearchParams } from "./shared.types";
import Answer from "@/database/models/answer.model";
import User from "@/database/models/user.model";
import Tag from "@/database/models/tag.model";

const SearchableTypes = ["question", "answer", "user", "tag"];

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

    const generateType = (fieldName: string, item: any) => {
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
    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      // поиск без фильтров.

      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model.find({ [searchField]: regexQuery }).limit(2);

        results.push(
          ...queryResults.map((item) => ({
            title: type === "answer" ? `Answers containing ${query}` : item[searchField],
            type,
            rutype: generateType(type!, item),
            id: generateId(type, item),
          })),
        );
      }
    } else {
      // Общий поиск по фильтрам.
      const modelInfo = modelsAndTypes.find((item) => item.type === type);

      if (!modelInfo) {
        throw new Error("Invalid search Type");
      }

      const queryResults = await modelInfo.model.find({ [modelInfo.searchField]: regexQuery }).limit(8);

      results = queryResults.map((item) => ({
        title: type === "answer" ? `Найденный комментарий: ${query}` : item[modelInfo.searchField],
        type,
        rutype: generateType(type!, item),
        id: generateId(type!, item),
      }));
    }

    return JSON.stringify(results);
  } catch (e) {
    console.log(e);
    throw e;
  }
};
