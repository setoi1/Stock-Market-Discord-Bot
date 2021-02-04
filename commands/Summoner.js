const Discord = require('discord.js');
const { RIOTAPIKEY } = require('../config.json');
const axios = require('axios');
const fetch = require('node-fetch');

module.exports = {

    name: 'summoner',
    description: 'Pulls summoner information',
    usage: '<region> <summoner name>',
    args: true,
    guildOnly: true,

    async execute(message, args) {

        const region = args[0];
        const inputName = args[1];

        var summoner = {};
        var league = [];
        var match = {};

        if (args[0] === undefined || args[1] === undefined) return message.reply('Usage: -summoner <region> <summoner name>');

        // Encrypted Info Fetch
        if (region === 'NA') {
            // Summoner Fetch
            try {
                const summonerResponse = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${inputName}?api_key=${RIOTAPIKEY}`);
                summoner = summonerResponse.data;
            }
            catch (error) {
                console.log(error);
            }

            // League Fetch
            try {
                const leagueResponse = await axios.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner.id}?api_key=${RIOTAPIKEY}`);
                league = leagueResponse.data;
            }
            catch (error) {
                console.log(error);
            }

            // Match Fetch
            try {
                const matchResponse = await axios.get(`https://na1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summoner.id}?api_key=${RIOTAPIKEY}`);
                match = matchResponse.data;
            }
            catch (error) {
                console.log(error);
            }

            const { accountId, name, profileIconId, summonerLevel  } = summoner;
            const { mapId, gameMode, gameType } = match;
            let mapType;

            // Current Map
            if (mapId === 11) {
                mapType = "Summoner's Rift";
            }
            else if (mapId === 12) {
                mapType = 'Howling Abyss';
            }
            else if (!match) {
                mapType = 'User is not in a match.';
            }

            var embed;

            switch (league.length) {
                case 0:
                    embed = new Discord.MessageEmbed()
                    .setColor(0x00AE86)
                    .setAuthor('Chineser', 'https://i.gyazo.com/thumb/1200/c3f5dbb6c885e84ca376dce711db2c2a-png.jpg')
                    .setTitle('Player Profile')
                    .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/11.2.1/img/profileicon/${profileIconId}.png`)
                    .addFields({ name: 'Summoner Name', value: `${name}` })
                    .addFields(
                        { name: 'Summoner Level', value: `${summoner.summonerLevel}`, inline: true },
                        { name: 'Current Match', value: `${mapType}`, inline: true },
                    )
                    .addFields({ name: 'Rank', value: 'Unranked' })
                    .setFooter(`https://na.op.gg/summoner/userName=${name}`);

                    message.channel.send(embed);
                    break;
                case 1:
                    let { tier, rank, leaguePoints, wins, losses } = league[0];

                    let winRatio = 100 * (wins / (wins + losses));
                    winRatio = winRatio.toFixed(0);

                    let rankString = (league[0].queueType === 'RANKED_SOLO_5x5') ? 'Ranked Solo / Duo' : 'Ranked Flex 5v5';

                    embed = new Discord.MessageEmbed()
                    .setColor(0x00AE86)
                    .setAuthor('Chineser', 'https://i.gyazo.com/thumb/1200/c3f5dbb6c885e84ca376dce711db2c2a-png.jpg')
                    .setTitle('Player Profile')
                    .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/11.2.1/img/profileicon/${profileIconId}.png`)
                    .addFields({ name: 'Summoner Name', value: `${name}` })
                    .addFields(
                        { name: 'Summoner Level', value: `${summonerLevel}`, inline: true },
                        { name: 'Current Match', value: `${mapType}`, inline: true },
                    )
                    .addFields({ name: `${rankString}`, value: `${tier} ${rank} ${leaguePoints} LP`, inline: true })
                    .addFields({ name: `${rankString}`, value: `${tier} ${rank} ${leaguePoints} LP`, inline: true })
                    .addFields({ name: 'Win / Loss Ratio', value: `${wins}W / ${losses}L | ${winRatio}%` })
                    .setFooter(`https://na.op.gg/summoner/userName=${name}`);

                    message.channel.send(embed);
                    break;
                case 2:
            } // End of Switch
        } // End of if

        // EUW
        if (region === 'EUW') {
            // Summoner Fetch
            try {
                const summonerResponse = await axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${inputName}?api_key=${RIOTAPIKEY}`);
                summoner = summonerResponse.data;
            }
            catch (error) {
                console.log(error);
            }

            // League Fetch
            try {
                const leagueResponse = await axios.get(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner.id}?api_key=${RIOTAPIKEY}`);
                league = leagueResponse.data;
            }
            catch (error) {
                console.log(error);
            }

            // Match Fetch
            try {
                const matchResponse = await axios.get(`https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summoner.id}?api_key=${RIOTAPIKEY}`);
                match = matchResponse.data;
            }
            catch (error) {
                console.log(error);
            }

            const { accountId, name, profileIconId, summonerLevel  } = summoner;
            const { mapId, gameMode, gameType } = match;
            let mapType;

            // Current Map
            if (mapId === 11) {
                mapType = "Summoner's Rift";
            }
            else if (mapId === 12) {
                mapType = 'Howling Abyss';
            }
            else if (!match) {
                mapType = 'User is not in a match.';
            }

            var embed;

            switch (league.length) {
                case 0:
                    embed = new Discord.MessageEmbed()
                    .setColor(0x00AE86)
                    .setAuthor('Chineser', 'https://i.gyazo.com/thumb/1200/c3f5dbb6c885e84ca376dce711db2c2a-png.jpg')
                    .setTitle('Player Profile')
                    .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/11.2.1/img/profileicon/${profileIconId}.png`)
                    .addFields({ name: 'Summoner Name', value: `${name}` })
                    .addFields(
                        { name: 'Summoner Level', value: `${summoner.summonerLevel}`, inline: true },
                        { name: 'Current Match', value: `${mapType}`, inline: true },
                    )
                    .addFields({ name: 'Rank', value: 'Unranked' })
                    .setFooter(`https://na.op.gg/summoner/userName=${name}`);

                    message.channel.send(embed);
                    break;
                case 1:
                    let { tier, rank, leaguePoints, wins, losses } = league[0];

                    let winRatio = 100 * (wins / (wins + losses));
                    winRatio = winRatio.toFixed(0);

                    let rankString = (league[0].queueType === 'RANKED_SOLO_5x5') ? 'Ranked Solo / Duo' : 'Ranked Flex 5v5';

                    embed = new Discord.MessageEmbed()
                    .setColor(0x00AE86)
                    .setAuthor('Chineser', 'https://i.gyazo.com/thumb/1200/c3f5dbb6c885e84ca376dce711db2c2a-png.jpg')
                    .setTitle('Player Profile')
                    .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/11.2.1/img/profileicon/${profileIconId}.png`)
                    .addFields({ name: 'Summoner Name', value: `${name}` })
                    .addFields(
                        { name: 'Summoner Level', value: `${summonerLevel}`, inline: true },
                        { name: 'Current Match', value: `${mapType}`, inline: true },
                    )
                    .addFields({ name: `${rankString}`, value: `${tier} ${rank} ${leaguePoints} LP`, inline: true })
                    .addFields({ name: `${rankString}`, value: `${tier} ${rank} ${leaguePoints} LP`, inline: true })
                    .addFields({ name: 'Win / Loss Ratio', value: `${wins}W / ${losses}L | ${winRatio}%` })
                    .setFooter(`https://na.op.gg/summoner/userName=${name}`);

                    message.channel.send(embed);
                    break;
                case 2:
            } // End of Switch
        } // End of if

        // KR
        if (region === 'KR') {
            // Summoner Fetch
            try {
                const summonerResponse = await axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${inputName}?api_key=${RIOTAPIKEY}`);
                summoner = summonerResponse.data;
            }
            catch (error) {
                console.log(error);
            }

            // League Fetch
            try {
                const leagueResponse = await axios.get(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner.id}?api_key=${RIOTAPIKEY}`);
                league = leagueResponse.data;
            }
            catch (error) {
                console.log(error);
            }

            // Match Fetch
            try {
                const matchResponse = await axios.get(`https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summoner.id}?api_key=${RIOTAPIKEY}`);
                match = matchResponse.data;
            }
            catch (error) {
                console.log(error);
            }

            const { accountId, name, profileIconId, summonerLevel  } = summoner;
            const { mapId, gameMode, gameType } = match;
            let mapType;

            // Current Map
            if (mapId === 11) {
                mapType = "Summoner's Rift";
            }
            else if (mapId === 12) {
                mapType = 'Howling Abyss';
            }
            else if (!match) {
                mapType = 'User is not in a match.';
            }

            var embed;

            switch (league.length) {
                case 0:
                    embed = new Discord.MessageEmbed()
                    .setColor(0x00AE86)
                    .setAuthor('Chineser', 'https://i.gyazo.com/thumb/1200/c3f5dbb6c885e84ca376dce711db2c2a-png.jpg')
                    .setTitle('Player Profile')
                    .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/11.2.1/img/profileicon/${profileIconId}.png`)
                    .addFields({ name: 'Summoner Name', value: `${name}` })
                    .addFields(
                        { name: 'Summoner Level', value: `${summoner.summonerLevel}`, inline: true },
                        { name: 'Current Match', value: `${mapType}`, inline: true },
                    )
                    .addFields({ name: 'Rank', value: 'Unranked' })
                    .setFooter(`https://na.op.gg/summoner/userName=${name}`);

                    message.channel.send(embed);
                    break;
                case 1:
                    let { tier, rank, leaguePoints, wins, losses } = league[0];

                    let winRatio = 100 * (wins / (wins + losses));
                    winRatio = winRatio.toFixed(0);

                    let rankString = (league[0].queueType === 'RANKED_SOLO_5x5') ? 'Ranked Solo / Duo' : 'Ranked Flex 5v5';

                    embed = new Discord.MessageEmbed()
                    .setColor(0x00AE86)
                    .setAuthor('Chineser', 'https://i.gyazo.com/thumb/1200/c3f5dbb6c885e84ca376dce711db2c2a-png.jpg')
                    .setTitle('Player Profile')
                    .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/11.2.1/img/profileicon/${profileIconId}.png`)
                    .addFields({ name: 'Summoner Name', value: `${name}` })
                    .addFields(
                        { name: 'Summoner Level', value: `${summonerLevel}`, inline: true },
                        { name: 'Current Match', value: `${mapType}`, inline: true },
                    )
                    .addFields({ name: `${rankString}`, value: `${tier} ${rank} ${leaguePoints} LP`, inline: true })
                    .addFields({ name: `${rankString}`, value: `${tier} ${rank} ${leaguePoints} LP`, inline: true })
                    .addFields({ name: 'Win / Loss Ratio', value: `${wins}W / ${losses}L | ${winRatio}%` })
                    .setFooter(`https://na.op.gg/summoner/userName=${name}`);

                    message.channel.send(embed);
                    break;
                case 2:
            } // End of Switch
        } // End of if

    } // End of Execute

};