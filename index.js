const { Client, Collection } = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const intents = ["GUILD_MEMBERS"];
const client = new Client({intents: intents});
client.commands = new Collection();
const cooldowns = new Collection();

const token = config.TOKEN;
const prefix = config.PREFIX;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.login(token);

client.once('ready', () => {
    console.log('Connected as ' + client.user.tag);
});

// Test
client.on('message', message => {
    if (message.content === `${prefix}test`) message.reply(`${client.user.tag} is online.`);
});

client.on('message', async message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.guildOnly && message.channel.type === 'dm') return message.reply('Dont try any of that shit boi');

    if (command.args && !args.length) {
        let reply = `No arguments were provided, ${message.author}`;
        if (command.usage) reply = `\nUsage: \`${prefix}${command.name} ${command.usage}\``;
        return message.channel.send(reply);
    }

    // Command Cooldown
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownTime = (command.cooldown || 10) * 1000;

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

// Chat logger
client.on('message', message => {
    let server = message.guild.name;
    let channel = message.channel.name;
    let author = message.author.tag;
    let content = message.content;
    let time = new Date().toLocaleTimeString();

    if (message.guild) {
        console.log(`[${server}][${channel}][${author}][${time}]: ${content}`);
    } 
    if (message.guild === null) {
        console.log(`[Direct Message]${author}${time}: ${content}`);
    }
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    let oldUserChannel = oldMember.channelID;
    let newUserChannel = newMember.channelID;

    console.log(`oldMember: ${oldUserChannel}`);
    console.log(`newMember: ${newUserChannel}`);

    let user = newMember.member.user.tag;

    let logChannelID = '912908578946424893';
    let logChannel = client.channels.cache.get(logChannelID);

    let time = new Date().toLocaleTimeString();
  
    if (oldUserChannel === newUserChannel) {  // If the user's voiceStateUpdate was emitted but has not changed channel
        return
    };
    if (newUserChannel === '105345089626185728') { // If the user moved and their state was set to AFK
        logChannel.send(`[${time}] ${user} is now AFK`);
    }
    else if (newUserChannel !== undefined && newUserChannel !== null) {  // If the user moved to a different channel but their state is not AFK
        let newChannelName = newMember.channel.name;
        logChannel.send(`[${time}] ${user} joined ${newChannelName}`);
    };
    if (newUserChannel === null) {  // If the user disconnects from the server
        let oldChannelName = oldMember.channel.name;
        logChannel.send(`[${time}] ${user} left ${oldChannelName}`);
    };
});

client.on('guildMemberRemove', member => {
    let time = new Date().toLocaleTimeString();
    let user = member.user.tag;
    console.log(`${user} is no longer in the server`);
    let logChannelID = '912908578946424893';
    let logChannel = client.channels.cache.get(logChannelID);
    logChannel.send(`[${time}] ${user} is no longer in the server`);
});