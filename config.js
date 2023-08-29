import fs from 'fs';

// ! generate new config object from message
/**
 * Generate a new config object from a message object
 * @param {Object} msg The message object
 * @return {Object} The config object
 */
function generateConfig(msg) {
  const chatID = msg.chat.id;

  return {
    [chatID]: {
      'userID': msg.from.id,
      'firstName': msg.from.first_name,
      'lastName': msg.from.last_name,
      'username': msg.from.username,
    },
  };
}

// ! Get user configuration
/**
 * Loads the current user configuration
 * @param {Object} msg The message object
 * @return {Object} The config object
 */
function loadConfig(msg) {
  const chatID = msg.chat.id;
  const configFile = 'config.json';

  // Check if the config file exists, if not. create one
  if (!fs.existsSync(configFile)) {
    const newConfig = generateConfig(msg);
    fs.writeFileSync(configFile, JSON.stringify(newConfig, null, 2));
    return newConfig;
  }

  const config = JSON.parse(fs.readFileSync(configFile));

  if (config[chatID]) {
    return config[chatID];
  } else {
    const newConfig = generateConfig(msg);
    config[chatID] = newConfig[chatID];
    fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
    return config[chatID];
  }
}

// ! Update user configuration
/**
 * Updates the user configuration
 * @param {Object} msg The message object
 * @param {String} property The property to be modified
 * @param {String} value The new value of the property
 * @return {Object} The config object
 */
function updateConfig(msg, property, value) {
  const chatID = msg.chat.id;
  loadConfig(msg);

  const configFile = 'config.json';
  const config = JSON.parse(fs.readFileSync(configFile));

  config[chatID][property] = value;
  fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
  return config[chatID];
}


export default {
  generateConfig,
  loadConfig,
  updateConfig,
};
