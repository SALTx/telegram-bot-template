import dotenv from "dotenv";
import telegramBot from "node-telegram-bot-api";
import commands from "./commands.js";
import chalk from "chalk";
import fs from "fs";

dotenv.config();
const bot = new telegramBot(process.env.TOKEN, { polling: true });

//! On receiving a message
bot.on("message", (msg) => {
  const chatID = msg.chat.id;
  let command = msg.text.split(" ")[0].substring(msg.text[0] === "/" ? 1 : 0);
  const args = msg.text.split(" ").slice(1);

  // Log the message
  logMessage(msg);

  // If the command is not in the list, respond with "Unknown command"
  if (!commands.has(command)) {
    bot.sendMessage(chatID, "Unknown command");
    return;
  }

  // If the command is in the list, execute it
  commands.get(command).callback(bot, msg, args);
  console.log("end of message");
});

//! Logging function
function logMessage(msg) {
  const logFile = "log.txt";
  const log = `${msg.from.username} (${msg.from.first_name} ${msg.from.last_name}) sent: ${msg.text}\n`;

  // check if the file exists, if not. create one
  if (!fs.existsSync(logFile)) {
    fs.writeFileSync(logFile, "");
  } else {
    fs.appendFileSync(logFile, log);
  }

  console.log(log);
}

//! Bot running
console.log(chalk.green("Bot is running..."));
