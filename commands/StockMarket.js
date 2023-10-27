const Discord = require('discord.js');
const axios = require('axios');
const { polygon } = require('../config.json');

module.exports = {
    name: 'stock',
    description: 'stock data',
    usage: '<ticker> <year-month-date>',
    args: true,
    guildOnly: true,
    async execute(message, args) {
        let ticker = args[1];
        if (args[0] === undefined) return message.reply('Usage: \`!stock <ticker> <news or price> (if price) <YYYY-MM-DD>\`');

        let embed = new Discord.MessageEmbed();

        try {
            switch (args[0]) {
                /*
                case 'tickers': // List all Polygon Tickers
                    await axios.get(`https://api.polygon.io/v3/reference/tickers?market=stocks&exchange=XNYS&active=true&apiKey=${POLYGONAPIKEY}`)
                        .then(function (response) {
                            const [{ ticker, name, last_updated_utc }] = response;
                            console.log(response)

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
                */
                case 'news': // Ticker News
                    if (args[1] === undefined) return message.reply('Usage: \`!stock news <ticker>\`');
                    await axios.get(`https://api.polygon.io/v2/reference/news?ticker=${ticker}&apiKey=${polygon}`)
                        .then(function (response) {
                            //console.log(response.data.results)
                            const { title, author, published_utc, article_url, image_url, description } = response.data.results[0];

                            embed = new Discord.MessageEmbed()
                            .setColor(0x00AE86)
                            .setThumbnail(`${image_url}`)
                            .setTitle(`${title}`)
                            //.setDescription(`${author}`)
                            .addFields(
                                { name: 'Author', value: `${author}` },
                                { name: 'Summary', value: `${description}` },
                                { name: 'URL', value: `${article_url}` },
                            );
                            message.channel.send(embed);
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                case 'price': // Daily Open / Close
                    if (args[2] === undefined) return message.reply('Usage: \`!stock price <ticker> <YYYY-MM-DD>\`');
                    const date = args[2];
                    await axios.get(`https://api.polygon.io/v1/open-close/${ticker}/${date}?adjusted=true&apiKey=${polygon}`)
                        .then(function (response) {
                            const { open, high, low, close, volume, afterHours, preMarket } = response.data;
                            embed = new Discord.MessageEmbed()
                            .setColor(0x00AE86)
                            .setTitle(`${ticker}`)
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