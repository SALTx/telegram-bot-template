/* eslint-disable */

import config from './config.js';

/**
 * Command class
 * @class
 * @property {string} name The name of the command
 * @property {string} description The description of the command
 * @property {function} callback The callback function of the command
 * @return {void}
 */
class Command {
  /**
   * @constructor
   * @param {string} name The name of the command
   * @param {string} description The description of the command
   * @param {function} callback The callback function of the command
   * @return {void}
   */
  constructor(name, description, callback) {
    this.name = name;
    this.description = description;
    this.callback = callback;
  }
}

const commands = new Map();

// ! Start command
commands.set(
    'start',
    new Command('start', 'Start the bot', (bot, msg, [args]) => {
      bot.sendMessage(msg.chat.id, 'Hello, world!');
    }),
);

// ! Help command
commands.set(
    'help',
    new Command('help', 'Shows list of commands', (bot, msg, [args]) => {
      let helpMessage = 'List of commands:\n';
      commands.forEach((command) => {
        helpMessage += `/${command.name} - ${command.description}\n`;
      });
      bot.sendMessage(msg.chat.id, helpMessage);
    }),
);

// ! Load config
commands.set(
  'loadconfig',
  new Command('loadconfig', 'Load the config', (bot, msg, [args]) => {
    const userConfig = config.loadConfig(msg);
    bot.sendMessage(msg.chat.id, JSON.stringify(userConfig, null, 2));
  })
);

// ! Update config
commands.set(
  'updateconfig',
  new Command('updateconfig', 'Update the user config', (bot, msg, [args]) => {
    const userConfig = config.updateConfig(msg, args[0], args[1]);
    bot.sendMessage(msg.chat.id, JSON.stringify(userConfig, null, 2));
  })
);

export default commands;
