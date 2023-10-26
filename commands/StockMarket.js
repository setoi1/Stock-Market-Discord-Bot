const Discord = require('discord.js');
const axios = require('axios');
const { POLYGONAPIKEY } = require('../config.json');

module.exports = {

    name: 'stock',
    description: 'stock data',
    usage: '<ticker> <year-month-date>',
    args: true,
    guildOnly: true,

    async execute(message, args) {
        if (args[0] === undefined || args[1] === undefined) return message.reply('Usage: \`-stock <ticker> <news or price> (if price) <YYYY-MM-DD>\`');

        let embed = new Discord.MessageEmbed();

        try {
            switch (args[1]) {
                case 'tickers': // List all Polygon Tickers
                    await axios.get(`https://api.polygon.io/v3/reference/tickers?market=stocks&exchange=XNYS&active=true&apiKey=${POLYGONAPIKEY}`)
                        .then(function (response) {
                            const [{ ticker, name, last_updated_utc }] = response;

                            embed = new Discord.MessageEmbed()
                            .setColor(0x00AE86)
                            .setThumbnail(`${logo}`)
                            .setTitle(`${ticker}`)
                            .setDescription(`${name}`)
                            .addFields(
                                { name: 'Last updated:', value: `${last_updated_utc}` }
                            );
                            message.channel.send(embed);
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                case 'news': // Ticker News
                    await axios.get(`https://api.polygon.io/v1/meta/symbols/${ticker}/news?perpage=5&page=1&apiKey=${POLYGONAPIKEY}`)
                        .then(function (response) {
                            const [{ title, source, summary }] = response;
                            const newsURL = tickerNews[0].url;

                            embed = new Discord.MessageEmbed()
                            .setColor(0x00AE86)
                            .setThumbnail(`${logo}`)
                            .setTitle(`${ticker}`)
                            .setDescription(`${name} | ${url}`)
                            .addFields(
                                { name: 'URL', value: `${newsURL}` },
                                { name: 'Title', value: `${title}` },
                                { name: 'Summary', value: `${summary}` },
                                { name: 'Source', value: `${source}`},
                            );
                            message.channel.send(embed);
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                case 'price': // Daily Open / Close
                    const date = args[2];
                    await axios.get(`https://api.polygon.io/v1/open-close/${ticker}/${date}?unadjusted=true&apiKey=${POLYGONAPIKEY}`)
                        .then(function (response) {
                            const { preMarket, open, low, high, close, volume, afterHours } = response;
                            embed = new Discord.MessageEmbed()
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
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
            };
        } catch (error) {
            console.log(error);
        }
    },
};