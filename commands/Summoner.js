const Discord = require('discord.js');
const fetch = require('node-fetch');
const { apiKey } = require('../config.json');

module.exports = {

    name: 'summoner',
    description: 'Pulls summoner information',
    usage: '<summoner name>',
    args: true,
    guildOnly: true,

    async execute(message, args) {

        const inName = args[0];

        if (args[0] === undefined) return message.reply('Usage: -summoner <summoner name>');

        try {

            const { accountId, name, id } = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${inName}?api_key=${apiKey}`).then(response => response.json());
            console.log('First fetch completed');
            console.log(`Summoner ID: ${id}\nAccount ID: ${accountId}`);

            const [ { rank, tier, leaguePoints, wins, losses } ] = await fetch(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${apiKey}`).then(response => response.json());
            console.log('Second fetch completed');

            if (rank == undefined) {
                console.log(`Summoner Name: ${name}\nSummoner ID: ${id}\nAcccount ID: ${accountId}\nRank: Unranked`);
                const embed1 = new Discord.MessageEmbed()
                .setColor(0x00AE86)
                .setTitle(`${name}`)
                .setAuthor('Bot', 'https://i.gyazo.com/thumb/1200/c3f5dbb6c885e84ca376dce711db2c2a-png.jpg')
                .setDescription(`${name}'s Ranked Profile`)
                .addFields({ name: 'Summoner Name', value: `${name}`, inline: true })
                .addFields({ name: 'Solo Queue Rank', value: 'Unranked', inline: true });

                message.channel.send(embed1);
            }
            else {

                let winRatio = 100 * (wins / (wins + losses));
                winRatio = winRatio.toFixed(2);

                console.log(`Summoner Name: ${name}\nSummoner ID: ${id}\nAcccount ID: ${accountId}\nRank: ${tier} ${rank} ${leaguePoints} LP\nWin Rate: ${wins} / ${losses} | ${winRatio}`);
                const embed2 = new Discord.MessageEmbed()
                .setColor(0x00AE86)
                .setTitle(`${name}`)
                .setAuthor('Bot', 'https://i.gyazo.com/thumb/1200/c3f5dbb6c885e84ca376dce711db2c2a-png.jpg')
                .setDescription('Ranked Profile')
                .addFields({ name: 'Summoner Name', value: `${name}` })
                .addFields({ name: 'Solo Queue Rank', value: `${tier} ${rank} ${leaguePoints} LP` })
                .addFields({ name: 'Win / Loss Ratio', value: `${wins}W / ${losses}L | ${winRatio}%` });

                message.channel.send(embed2);
            }

        }

        catch (error) {

            console.error(error);

            message.reply('Summoner does not exist or is not ranked.');

        }

    },

};