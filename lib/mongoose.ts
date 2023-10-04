import mongoose from "mongoose";

let isConnected: boolean = false;

// Выключить уведомления о подключении.
let DISABLED_NOTIFICATIONS: boolean = true;

const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("❌ Ошибка: не установлен MONGODB_URL");

  if (isConnected) {
    if (DISABLED_NOTIFICATIONS) return;
    return console.log("🚀 Соединение с БД уже установлено.");
  }

  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`, {
      dbName: "Overflow",
    });

    isConnected = true;

    if (!DISABLED_NOTIFICATIONS) return console.log("🚀 Соединение с БД установлено.");
    return;
  } catch (e) {
    console.log(e, "Ошибка - Проблемы с подключением к БД - Фул Инфо:", e);
  }
};

export default connectToDatabase;
