const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {

    name: '234u239u4honk',
    description: 'Checks if the bot is online or not',
    guildOnly: true,

    execute(message) {

        message.reply(`${client.user.tag} is online.`);

    },

};