const Discord = require('discord.js');
const axios = require('axios');
const { polygon } = require('../config.json');

module.exports = {
    name: 'stock',
    description: 'stock data',
    usage: '<request-type>',
    args: true,
    guildOnly: true,
    async execute(message, args) {
        const ticker = args[1];
        if (args[0] === undefined) return message.reply('Usage: \`!stock <request-type>\`');
        let embed = new Discord.MessageEmbed();

        try {
            switch (args[0]) {
                case 'details': // Ticker details
                    if (args[1] === undefined) return message.reply('Usage: \`!stock details <ticker>\`');
                    await axios.get(`https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${polygon}`)
                        .then(function (response) {
                            const { name, primary_exchange, active, market_cap, phone_number, description, homepage_url, total_employees, list_date, branding } = response.data.results;
                            const { logo_url } = branding;

                            embed = new Discord.MessageEmbed()
                            .setColor(0x00AE86)
                            .setThumbnail(`${logo_url}`)
                            .setTitle(`${name}`)
                            .addFields(
                                { name: 'Ticker', value: `${ticker}` },
                                { name: 'Website', value: `${homepage_url}` },
                                { name: 'Phone', value: `${phone_number}` },
                                { name: 'Total Employees', value: `${total_employees}` },
                                { name: 'List Date', value: `${list_date}` },
                                { name: 'Description', value: `${description}` },
                            );
                            message.channel.send(embed);
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                    break;
                case 'news': // Ticker news
                    if (args[1] === undefined) return message.reply('Usage: \`!stock news <ticker>\`');
                    await axios.get(`https://api.polygon.io/v2/reference/news?ticker=${ticker}&apiKey=${polygon}`)
                        .then(function (response) {
                            const { title, author, published_utc, article_url, image_url, description } = response.data.results[0];

                            embed = new Discord.MessageEmbed()
                            .setColor(0x00AE86)
                            .setThumbnail(`${image_url}`)
                            .setTitle(`${title}`)
                            .addFields(
                                { name: 'Author', value: `${author}` },
                                { name: 'Date Published', value: `${published_utc}` },
                                { name: 'Summary', value: `${description}` },
                                { name: 'URL', value: `${article_url}` },
                            );
                            message.channel.send(embed);
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                    break;
                case 'price': // Daily Open / Close
                    if (args[2] === undefined) return message.reply('Usage: \`!stock price <ticker> <YYYY-MM-DD>\`');
                    const date = args[2];
                    await axios.get(`https://api.polygon.io/v1/open-close/${ticker}/${date}?adjusted=true&apiKey=${polygon}`)
                        .then(function (response) {
                            const { open, high, low, close, afterHours, preMarket } = response.data;
                            embed = new Discord.MessageEmbed()
                            .setColor(0x00AE86)
                            .setTitle(`${ticker}`)
                            .addFields(
                                { name: 'Pre-Market', value: `$${preMarket}`, inline: true },
                                { name: 'Low', value: `$${low}`, inline: true },
                                { name: 'Open', value: `$${open}`, inline: true },
                            )
                            .addFields(
                                { name: 'After-Hours', value: `$${afterHours}`, inline: true },
                                { name: 'High', value: `$${high}`, inline: true },
                                { name: 'Close', value: `$${close}`, inline: true },
                            );
                            message.channel.send(embed);
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                    break;
                default:
                    console.error('Invalid command');
            };
        } catch (error) {
            console.log(error);
        }
    },
};