import fs from 'fs';

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

export default logMessage;
