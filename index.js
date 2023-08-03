import dotenv from "dotenv";
import telegramBot from "node-telegram-bot-api";
import fs from "fs";
import path from "path";
import commands from "./commands.js";
import chalk from "chalk";

dotenv.config();
const bot = new telegramBot(process.env.TOKEN, { polling: true });

bot.on("message", (msg) => {
  console.log(`Message from ${msg.from.username} ${msg.from.id}: ${msg.text}`);
});

console.log(chalk.green("Bot is running..."));
