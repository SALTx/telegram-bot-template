import TelegramBot from 'node-telegram-bot-api';
import commands from './commands.js';
import dotenv from 'dotenv';
import chalk from 'chalk';
import fs from 'fs';

dotenv.config();
const bot = new TelegramBot(process.env.TOKEN, {polling: true});

// ! On receiving a message
bot.on('message', (msg) => {
  const chatID = msg.chat.id;
  let command = msg.text.split(' ')[0].substring(msg.text[0] === '/' ? 1 : 0);
  command = command.toLowerCase();
  const args = msg.text.split(' ').slice(1);

  // Log the message
  logMessage(msg);

  // If the command is not in the list, respond with "Unknown command"
  if (!commands.has(command)) {
    bot.sendMessage(chatID, 'Unknown command');
    return;
  }

  // If the command is in the list, execute it
  commands.get(command).callback(bot, msg, [args]);
});

// ! Logging function
/**
 * Logs the message to the console and to a file
 * @param {Object} msg The message object when a message is received
 * @return {void}
 */
function logMessage(msg) {
  const logFile = 'log.txt';
  const name = `(${msg.from.first_name} ${msg.from.last_name})`;
  // formatted date YYYY-MM-DD HH:MM:SS
  const formattedDate = new Date()
      .toISOString()
      .replace(/T/, ' ')
      .replace(/\..+/, '');
  const log =
  `[${formattedDate}]${msg.from.username} ${name} sent: ${msg.text}\n`;

  // check if the file exists, if not. create one
  if (!fs.existsSync(logFile)) {
    fs.writeFileSync(logFile, log);
  } else {
    fs.appendFileSync(logFile, log);
  }

  console.log(log);
}

// ! Bot running
console.log(chalk.green('Bot is running...'));

// ! Message object
// {
//   message_id: 3,
//   from: {
//     id: 123456789,
//     is_bot: false,
//     first_name: 'John',
//     last_name: 'Doe',
//     username: 'johndoe',
//     language_code: 'en',
//   },
//   chat: {
//     id: 123456789,
//     first_name: 'John',
//     last_name: 'Doe',
//     username: 'johndoe',
//     type: 'private',
//   },
//   date: 1600000000,
//   text: 'Hello, world!',
// }
