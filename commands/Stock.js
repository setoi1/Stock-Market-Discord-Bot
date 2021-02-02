const Discord = require('discord.js');
const { POLYGONAPIKEY } = require('../config.json');
const fetch = require('node-fetch');
const axios = require('axios');

module.exports = {

    name: 'stock',
    description: 'Stock share price',
    usage: '<ticker> <year-month-date>',
    args: true,
    guildOnly: true,

    async execute(message, args) {

        const ticker = args[0];
        const date = args[1];

        try {

            // Ticker Details
            const tickerDetails = await fetch(`https://api.polygon.io/v1/meta/symbols/${ticker}/company?&apiKey=${POLYGONAPIKEY}`).then(response => response.json());
            const { logo, industry, sector, marketcap, url, description, name, symbol } = tickerDetails;

            console.log(tickerDetails);

            /*
            // Ticker News
            const tickerNews = await fetch(`https://api.polygon.io/v1/meta/symbols/${ticker}/news?perpage=5&page=1&apiKey=${POLYGONAPIKEY}`).then(response => response.json());
            const {  } = tickerNews;
            */

            // console.log(tickerNews);

            // Daily Open / Close
            const dailyOpenClose = await fetch(`https://api.polygon.io/v1/open-close/${ticker}/${date}?unadjusted=true&apiKey=${POLYGONAPIKEY}`).then(response => response.json());
            const { preMarket, open, low, high, close, volume, afterHours } = dailyOpenClose;

            console.log(dailyOpenClose);

            const embed = new Discord.MessageEmbed()
                .setColor(0x00AE86)
                .setThumbnail(`${logo}`)
                .setTitle(`${ticker}`)
                .setDescription(`${name} | ${url}`)
                .addFields(
                    { name: 'Pre-Market', value: `${preMarket}`, inline: true },
                    { name: 'Low', value: `${low}`, inline: true },
                    { name: 'Close', value: `${close}`, inline: true },
                )
                .addFields(
                    { name: 'Open', value: `${open}`, inline: true },
                    { name: 'High', value: `${high}`, inline: true },
                    { name: 'After-Hours', value: `${afterHours}`, inline: true },
                )
                .addFields(
                    { name: 'Volume', value: `${volume}`, inline: true },
                    { name: 'Market Cap', value: `${marketcap}`, inline: true },
                    { name: 'Sector', value: `${sector}`, inline: true },
                );


            message.channel.send(embed);
        }

        catch (error) {
            console.log(error);
        }
    },
};