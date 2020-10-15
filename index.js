const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const token = config.token;
const prefix = config.prefix;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);

}

client.login(token);

client.once('ready', () => {

    console.log('Connected as ' + client.user.tag);

});

client.on('message', async message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.guildOnly && message.channel.type === 'dm') {

        return message.reply('Dont try any of that shit boi');

    }

    if (command.args && !args.length) {

        let reply = `No arguments were provided, ${message.author}`;

        if (command.usage) {

            reply = `\nUsage: \`${prefix}${command.name} ${command.usage}\``;

        }

        return message.channel.send(reply);

    }

    if (!cooldowns.has(command.name)) {

        cooldowns.set(command.name, new Discord.Collection());

    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownTime = (command.cooldown || 0) * 1000;

    if (timestamps.has(message.author.id)) {

        const expirationTime = timestamps.get(message.author.id) + cooldownTime;

        if (now < expirationTime) {

            const timeLeft = (expirationTime - now) / 1000;

            return message.reply(`Please wait ${timeLeft.toFixed(1)} more seconds to use the \`${command.name}\` command.`);

        }

    }

    timestamps.set(message.author.id, now);

    setTimeout(() => timestamps.delete(message.author.id), cooldownTime);

	try {

        client.commands.get(commandName).execute(message, args);

    }

    catch (error) {

        console.error(error);

        message.reply('Invalid Command');

	}

});

client.on('message', message => {

    if (message.content === `${prefix}tester`) {

        message.reply(`${client.user.tag} is online.`);

    }

});

// Chat logger
client.on('message', message => {

    if (message.guild) {

        console.log(`${message.author.tag}[Server]: ${message.content}`);

    }

    if (message.guild === null) {

        console.log(`${message.author.tag}[Direct Message]: ${message.content}`);

    }

});

// Logs when a user joins the server
client.on('guildMemberAdd', () => {

    console.log('A user joined the server');

});

// Logs when a user leaves the server
client.on('guildMemberRemove', () => {

    console.log('A user was kicked, banned, or left the server');

});