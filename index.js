const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token, prefix }= require('./config.json');
const fs = require('fs');
const intents = ["GUILD_MEMBERS"];
const client = new Client({intents: intents});
client.commands = new Collection();
const cooldowns = new Collection();

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

    if (command.guildOnly && message.channel.type === 'dm') return message.reply('Bot does not respond to direct messages.');

    if (command.args && !args.length) {
        let reply = `No arguments were provided, ${message.author}`;
        if (command.usage) reply = `\nUsage: \`${prefix}${command.name} ${command.usage}\``;
        return message.channel.send(reply);
    };

    // Command Cooldown
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
    };

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownTime = (command.cooldown || 10) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownTime;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`Please wait ${timeLeft.toFixed(1)} more seconds to use the \`${command.name}\` command.`);
        };
    };

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownTime);

	try {
        client.commands.get(commandName).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Invalid Command');
	};

});

// Chat logger
client.on('message', message => {
    let server = message.guild.name;
    let channel = message.channel.name;
    let author = message.author.tag;
    let content = message.content;
    let time = new Date().toLocaleTimeString();

    if (message.guild) {
        console.log(`[${server}][${channel}][${author}][${time}]: ${content}`);
    };
    if (message.guild === null) {
        console.log(`[Direct Message]${author}${time}: ${content}`);
    };
});