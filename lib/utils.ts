import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// en
// export const getTimestamp = (createdAt: Date): string => {
//   const now = new Date();
//   const timeDifference = now.getTime() - createdAt.getTime();

//   // Define time intervals in milliseconds
//   const minute = 60 * 1000;
//   const hour = 60 * minute;
//   const day = 24 * hour;
//   const week = 7 * day;
//   const month = 30 * day;
//   const year = 365 * day;

//   if (timeDifference < minute) {
//     const seconds = Math.floor(timeDifference / 1000);
//     return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
//   } else if (timeDifference < hour) {
//     const minutes = Math.floor(timeDifference / minute);
//     return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
//   } else if (timeDifference < day) {
//     const hours = Math.floor(timeDifference / hour);
//     return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
//   } else if (timeDifference < week) {
//     const days = Math.floor(timeDifference / day);
//     return `${days} ${days === 1 ? "day" : "days"} ago`;
//   } else if (timeDifference < month) {
//     const weeks = Math.floor(timeDifference / week);
//     return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
//   } else if (timeDifference < year) {
//     const months = Math.floor(timeDifference / month);
//     return `${months} ${months === 1 ? "month" : "months"} ago`;
//   } else {
//     const years = Math.floor(timeDifference / year);
//     return `${years} ${years === 1 ? "year" : "years"} ago`;
//   }
// };

export function getTimestamp(createdAt: Date): string {
  const months = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ];

  const date = new Date(createdAt);
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  return `${day} ${month}, ${hours}:${minutes}`;
}

// Округление чисел (число просмотров, лайков, комментов)
export const formatAndDivideNumber = (num: number): number | string => {
  if (num >= 1000000) {
    const formattedNum = (num / 1000000).toFixed(1);
    return `${formattedNum}M`;
  } else if (num >= 1000) {
    const formattedNum = (num / 1000).toFixed(1);
    return `${formattedNum}K`;
  } else {
    return num;
  }
};

export function formatDate(inputDate: string): string {
  const date = new Date(inputDate);
  const monthNames = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ];

  const year = date.getFullYear();
  const month = date.getMonth();

  return `Регистрация: ${monthNames[month]} ${year}`;
}
