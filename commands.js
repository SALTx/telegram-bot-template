class Command {
	constructor(name, description, callback) {
		this.name = name;
		this.description = description;
		this.callback = callback;
	}
}

const commands = new Map();

//! Start command
commands.set(
	'start',
	new Command('start', 'Start the bot', (msg) => {
		bot.sendMessage(msg.chat.id, 'Hello, world!');
	})
);

export default commands;
