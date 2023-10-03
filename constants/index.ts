import { SidebarLink } from "@/types";

export const themes = [
  { value: "light", label: "Светлая", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Темная", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "Компьютер", icon: "/assets/icons/computer.svg" },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Главная",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/collection",
    label: "Избранное",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/community",
    label: "Пользователи",
  },

  {
    imgURL: "/assets/icons/suitcase.svg",
    route: "/jobs",
    label: "Вакансии",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/tags",
    label: "Теги",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/",
    label: "Профиль",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: "/ask-question",
    label: "Опубликовать",
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};
