

const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const express = require('express');
require('dotenv').config();

const prefix = 'e!'; 
const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((a) => {
    return GatewayIntentBits[a];
  }),
});
const { printWatermark } = require('./functions/handlers');


const app = express();
const port = 3000;
app.get('/', (req, res) => {
  const imagePath = path.join(__dirname, 'index.html');
  res.sendFile(imagePath);
});
app.listen(port, () => {
  console.log(`🔗 Listening to RTX: http://localhost:${port}`);
});
printWatermark();

client.commands = new Map();
const basicCommandsPath = path.join(__dirname, 'basicCommands');


const basicCommandFiles = fs.readdirSync(basicCommandsPath).filter((file) => file.endsWith('.js'));

for (const file of basicCommandFiles) {
  const command = require(path.join(basicCommandsPath, file));
  client.commands.set(command.name, command);
}

client.on('messageCreate', (message) => {
  // Ignore messages from other bots
  if (message.author.bot) return;

  // Check for matching errors using the error command
  const errorCommand = client.commands.get('error');
  if (errorCommand) {
    try {
      errorCommand.execute(message);
    } catch (error) {
      console.error(error);
      message.reply('There was an error handling errors!');
    }
  }

  // Check if the message is a command
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (command) {
      try {
        command.execute(message, args);
      } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
      }
    }
  }
});


async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log('\x1b[32m%s\x1b[0m', '|    🍔 Bot logged in successfully!');
    console.log('\x1b[36m%s\x1b[0m', '|    🚀 Commands Loaded successfully!');
    console.log('\x1b[32m%s\x1b[0m', `|    🌼 Logged in as ${client.user.username}`);
    console.log('\x1b[36m%s\x1b[0m', `|    🏡 Bot is in ${client.guilds.cache.size} servers`);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Failed to log in:', error);
    console.log('\x1b[31m%s\x1b[0m', '❌ Client Not Login, Restarting Process...');
    process.kill(1);
  }
}




client.once('ready', () => {
  setTimeout(() => {
    console.log('\x1b[32m%s\x1b[0m', `|    🎯 Activity successfully set!`);
    client.user.setPresence({
      activities: [
        {
          name: `Chill I Will Help`,
          type: ActivityType.Streaming, // Set activity type to Streaming
          url: 'https://www.youtube.com/watch?v=t8yVk0bm684', // Add a valid streaming link
        },
      ],
      status: 'dnd',
    });
  }, 2000); 
});


login();


setInterval(() => {
  if (!client || !client.user) {
    console.log('\x1b[31m%s\x1b[0m', '❌ Client Not Logged in, Restarting Process...');
    process.kill(1);
  }
}, 15000);

module.exports = client;

