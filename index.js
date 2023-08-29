import TelegramBot from 'node-telegram-bot-api';
import commands from './commands.js';
import logMessage from './log.js';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();
const bot = new TelegramBot(process.env.TOKEN, {polling: true});

// ! On receiving a message
bot.on('message', (msg) => {
  const chatID = msg.chat.id;
  const command = msg.text.split(' ')[0].substring(msg.text[0] === '/' ? 1 : 0)
      .toLowerCase();
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

// ! Set commands
const botCommands = [];
commands.forEach((command) => {
  botCommands.push({
    command: command.name,
    description: command.description,
  });
});
bot.setMyCommands(botCommands);

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
