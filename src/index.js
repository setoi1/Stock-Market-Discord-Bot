require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

const TOKEN = process.env.DISCORD_TOKEN;
const PREFIX = process.env.PREFIX;

client.once('ready', () => {
    console.log('Connected as ' + client.user.tag);

});

// Test command
client.on('message', (message) => {

    if (message.content === `${PREFIX}test`) {

        message.reply(`${client.user.tag} is online.`);

    }

});

// Info command
client.on('message', (message) => {

    if (message.content === `${PREFIX}statbot`) {

        message.reply('"-help statbot" for additional commands.');

    }

});

// Help command
client.on('message', (message) => {

    if (message.content === `${PREFIX}help statbot`) {

        message.reply('-league [Summoner Name] or -warzone [Battle.net: Username#[tag]|Activision: Username#[tag]]');

    }

});

// Boston command
client.on('message', (message) => {

    if (message.content === `${PREFIX}boston`) {

        message.channel.send('<@105124014111920128> league?');

    }

});

// Avatar command
client.on('message', (message) => {

    if (message.content === `${PREFIX}avatar`) {

        message.reply({
            files: ['https://cdn.discordapp.com/attachments/755652440933662740/756556133560483931/image0.jpg'],
        });

    }

});

// League command
client.on('message', (message) => {

    if (message.content.startsWith(PREFIX)) {

        const args = message.content.slice(PREFIX.length).trim().split(' ');
        const command = args.shift().toLowerCase();

        if (command === 'league') {

            if (!args.length) return message.reply('Add Summoner Name after -league');

            message.reply(`https://na.op.gg/summoner/userName=${args}`);

        }

    }

});

client.on('message', (message) => {

    console.log(`[${message.author.tag}]: ${message.content}`);

});

client.login(TOKEN);