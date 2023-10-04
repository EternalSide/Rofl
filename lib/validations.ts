import * as z from "zod";

const MIN_MESSAGE_TEMPLATE = `Минимальное количество символов: `;

export const Questions_Schema = z.object({
  title: z
    .string()
    .min(5, { message: `${MIN_MESSAGE_TEMPLATE}5` })
    .max(130),
  explanation: z.string().min(15, `${MIN_MESSAGE_TEMPLATE}15`).max(10000),
  tags: z
    .array(z.string().min(1).max(15))
    .min(1, { message: "Минимальное количество Тегов: 1" })
    .max(3, { message: "Максимальное количество Тегов: 3" }),
});

export const AnswerSchema = z.object({
  answer: z.string().min(5, { message: `${MIN_MESSAGE_TEMPLATE}5` }),
});

export const UserSchema = z.object({
  name: z.string().min(5).max(25),
  // username: z.string().min(5).max(25),
  portfolio_link: z.string().url().min(5).max(50),
  location: z.string().min(5).max(50),
  bio: z.string().min(5).max(200),
});
