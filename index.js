const Discord = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv').config();

const client = new Discord.Client();
client.commands = new Discord.Collection();

// Returns an array of all files in the commands folder and filters out non-JS files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);

}

const token = process.env.DISCORD_TOKEN;
const prefix = process.env.PREFIX;

client.login(token);

// READY
client.once('ready', () => {

    console.log('Connected as ' + client.user.tag);

});

client.on('message', message => {

    // Message has to start with the - prefix and can't be sent by a bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Slices the actual content of the message, trims the white space, and splits the string into a list
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    // Shift the command message to lowercase
	const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

	try {

        client.commands.get(command).execute(message, args);

    }

    catch (error) {

        console.error(error);

        message.reply('Invalid Command');

	}

});

// Test command
/* client.on('message', message => {

    if (message.content === `${prefix}test`) {

        message.reply(`${client.user.tag} is online.`);

    }

});*/

// Chat logger
client.on('message', message => {

    console.log(`${message.author.tag}: ${message.content}`);

    console.log(`message.length: ${message.content.length}`);

});