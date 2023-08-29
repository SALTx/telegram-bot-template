/* eslint-disable */
import chalk from 'chalk';
import fs from 'fs';

//! generate new config object from message
function generateConfig(msg) {
    const chatID = msg.chat.id;

    return {
        [chatID]: {
            'firstName': msg.from.first_name,
            'lastName': msg.from.last_name,
            'username': msg.from.username,
        }
    };
}

//! Get user configuration
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

    if(config[chatID]) {
        return config[chatID];
    } else {
        const newConfig = generateConfig(msg);
        config[chatID] = newConfig[chatID];
        fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
        return config[chatID];
    }
}