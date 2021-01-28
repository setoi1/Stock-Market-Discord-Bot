const Discord = require('discord.js');
const fetch = require('node-fetch');
const { WEATHERAPIKEY } = require('../config.json');

module.exports = {

    name: 'weather',
    description: 'Pulls temperature from location',
    usage: '<city/town> <state initials> <country code>',
    args: true,
    guildOnly: true,

    async execute(message, args) {

        const city = args[0];
        const state = args[1];
        const countryCode = args[2];

        if (args[0] === undefined || args[1] === undefined) return message.reply('Usage: -weather <location> <state initials> <country code>');

        try {

            const { weather, main, name } = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${countryCode}&appid=${WEATHERAPIKEY}`).then(response => response.json());

            const condition = weather[0].main;
            const mainTemp = main.temp;
            const humidity = main.humidity;
            const convertedTempF = Math.round(((mainTemp - 273.15) * 1.8) + 32);
            const convertedTempC = Math.round(mainTemp - 273.15);

            const toUpperState = state.toUpperCase();

            const embed = new Discord.MessageEmbed()
            .setColor(0x00AE86)
            .setAuthor('Jason', 'https://i.gyazo.com/thumb/1200/c3f5dbb6c885e84ca376dce711db2c2a-png.jpg')
            .setTitle('Location')
            .setDescription(`${name}, ${toUpperState}`)
            .addFields({ name: 'Fahrenheit', value: `${convertedTempF}°` })
            .addFields({ name: 'Celsius', value: `${convertedTempC}°` })
            .addFields({ name: 'Condition', value: `${condition}` })
            .addFields({ name: 'Humidity', value: `${humidity}%` });

            message.channel.send(embed);

        }

        catch (error) {

            console.log(error);

            message.reply('Location does not exist');

        }

    },

};