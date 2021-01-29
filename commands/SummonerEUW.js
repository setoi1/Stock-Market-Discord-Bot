const Discord = require('discord.js');
const fetch = require('node-fetch');
const { RIOTAPIKEY } = require('../config.json');

module.exports = {

    name: 'summonereuw',
    description: 'Pulls summoner information',
    usage: '<summoner name>',
    args: true,
    guildOnly: true,

    async execute(message, args) {

        const inName = args[0];

        if (args[0] === undefined) return message.reply('Usage: -summonereuw <summoner name>');

        try {

            const { accountId, name, id, summonerLevel } = await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${inName}?api_key=${RIOTAPIKEY}`).then(response => response.json());
            console.log('First fetch completed');

            const EUResponse = await fetch(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${RIOTAPIKEY}`).then(response => response.json());
            console.log('Second fetch completed');

            console.log(EUResponse);

            // console.log(`Summoner Name: ${name}\nSummoner ID: ${id}\nAcccount ID: ${accountId}\n ${queueType} Rank: ${tier} ${rank} ${leaguePoints} LP\nWin Rate: ${wins} / ${losses} | ${winRatio}`);

            if (EUResponse === undefined || EUResponse.length == 0) {

                const embed = new Discord.MessageEmbed()
                .setColor(0x00AE86)
                .setAuthor('Chineser', 'https://i.gyazo.com/thumb/1200/c3f5dbb6c885e84ca376dce711db2c2a-png.jpg')
                .setTitle('Player Profile')
                .addFields({ name: 'Summoner Name', value: `${name}` })
                .addFields({ name: 'Summoner Level', value: `${summonerLevel}` })
                .addFields({ name: 'Ranked Solo / Duo', value: 'Unranked' });

                message.channel.send(embed);

                console.log('Undefined');

            }

            else {

                const queueType = EUResponse[0].queueType;
                const rank = EUResponse[0].rank;
                const tier = EUResponse[0].tier;
                const leaguePoints = EUResponse[0].leaguePoints;
                const wins = EUResponse[0].wins;
                const losses = EUResponse[0].losses;

                let winRatio = 100 * (wins / (wins + losses));
                winRatio = winRatio.toFixed(0);

                console.log(`Summoner Name: ${name}\nSummoner ID: ${id}\nAcccount ID: ${accountId}\n ${queueType} Rank: ${tier} ${rank} ${leaguePoints} LP\nWin Rate: ${wins} / ${losses} | ${winRatio}`);

                console.log(EUResponse);

                if (queueType === 'RANKED_SOLO_5x5') {

                    const embed = new Discord.MessageEmbed()
                    .setColor(0x00AE86)
                    .setAuthor('Chineser', 'https://i.gyazo.com/thumb/1200/c3f5dbb6c885e84ca376dce711db2c2a-png.jpg')
                    .setTitle('Player Profile')
                    .addFields({ name: 'Summoner Name', value: `${name}` })
                    .addFields({ name: 'Summoner Level', value: `${summonerLevel}` })
                    .addFields({ name: 'Ranked Solo / Duo', value: `${tier} ${rank} ${leaguePoints} LP` })
                    .addFields({ name: 'Win / Loss Ratio', value: `${wins}W / ${losses}L | ${winRatio}%` });

                    message.channel.send(embed);

                }

                else if (queueType === 'RANKED_FLEX_SR') {

                    const embed = new Discord.MessageEmbed()
                    .setColor(0x00AE86)
                    .setAuthor('Chineser', 'https://i.gyazo.com/thumb/1200/c3f5dbb6c885e84ca376dce711db2c2a-png.jpg')
                    .setTitle('Player Profile')
                    .addFields({ name: 'Summoner Name', value: `${name}` })
                    .addFields({ name: 'Summoner Level', value: `${summonerLevel}` })
                    .addFields({ name: 'Ranked Flex 5V5', value: `${tier} ${rank} ${leaguePoints} LP` })
                    .addFields({ name: 'Win / Loss Ratio', value: `${wins}W / ${losses}L | ${winRatio}%` });

                    message.channel.send(embed);

                }
            }
        }

        catch (error) {

            console.error(error);

            message.reply('Summoner is not ranked or does not exist.');

        }

    },

};