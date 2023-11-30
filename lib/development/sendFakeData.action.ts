// "use server";
// import { faker } from "@faker-js/faker";
// import { createQuestion } from "./question.action";

// Функции для Добавления вопрос и проверки фильтров, поиска, пагинации..
// export const sendSomeFakeData = async (count: number) => {
//   try {
//     for (let i = 0; i <= count; i++) {
//       await createQuestion({
//         title: `[Тест Вопрос] - ${faker.person.bio()}`,
//         content: `Описание сгенерировано библиотекой Faker - ${faker.person.bio()}`,
//         tags: [`test`],
//         author: "651d937e25821f63e703f4f5",
//         path: "/",
//       });
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };
