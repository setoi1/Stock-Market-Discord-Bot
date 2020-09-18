require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const guild = new Discord.Guild();
const guildMember = new Discord.GuildMember();

const TOKEN = process.env.DISCORD_TOKEN;
const PREFIX = process.env.PREFIX;

client.once('ready', () => {
    console.log('Connected as ' + client.user.tag);

});

client.on('message', message => {

    if (message.content === `${PREFIX}test`) {

        message.reply(`${client.user.tag} is online.`);

    }

});

client.on('message', message => {

    if (message.content === `${PREFIX}statbot`) {

        message.reply('"-help statbot" for additional commands.');

    }

});


client.on('message', message => {

    if (message.content === `${PREFIX}help statbot`) {

        message.reply('-league [Summoner Name] or -warzone [Battle.net: Username#[tag]|Activision: Username#[tag]]');

    }

});

client.on('message', message => {

    if (message.content === `${PREFIX}helper`) {

        //console.log(`${client.user.avatarURL}`);

        message.reply(`${client.user.avatarURL} league?`);

    }

});

client.login(TOKEN);