const fetch = require('node-fetch');

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

            const { weather, main, name } = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${countryCode}&appid=cae62c04ff9ff9d30eb282663f9cfe8f`).then(response => response.json());

            const conditions = weather[0].main;
            const mainTemp = main.temp;
            const humidity = main.humidity;
            const convertedTempF = Math.round(((mainTemp - 273.15) * 1.8) + 32);
            const convertedTempC = Math.round(mainTemp - 273.15);

            message.channel.send(`Location: ${name}\nFahrenheit: ${convertedTempF}°\nCelsius: ${convertedTempC}°\nConditions: ${conditions}\nHumidity: ${humidity}%`);

        }

        catch {

            message.reply('Location does not exist');

            console.log('Promise Rejected');

        }

    },

};