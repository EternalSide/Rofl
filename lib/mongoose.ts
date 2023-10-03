import mongoose from "mongoose";

let isConnected: boolean = false;

const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("❌ Ошибка: В '.env.local' не установлен MONGODB_URL");

  if (isConnected) return;

  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`, {
      dbName: "Overflow",
    });
    isConnected = true;
    console.log("🚀 Соединение с БД установлено.");
  } catch (e) {
    console.log(e, "Ошибка: Проблемы с подключением к БД.");
  }
};

export default connectToDatabase;
