const Discord = require('discord.js');
const client = new Discord.Client({ TOKEN: process.env.DISCORD_TOKEN });
require('dotenv').config();

const TOKEN = process.env.DISCORD_TOKEN;
const PREFIX = process.env.PREFIX;

client.on('ready', () => {
    console.log('Connected as ' + client.user.tag);

});

client.on('message', message => {

    if (message.content === `${PREFIX}statbot`) {

        message.reply('"-help statbot" for additional commands');

    }

});

client.on('message', message => {

    if (message.content === `${PREFIX}help statbot`) {

        message.reply('-league [Summoner Name] or -warzone [Battle.net: Username#[tag]|Activision: Username#[tag]]');

    }

});

client.on('message', message => {

    if (message.content === `${PREFIX}boston`) {

        message.reply(' league?');

    }

});

client.login(TOKEN);