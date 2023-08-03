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

export default commands;
