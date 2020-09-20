module.exports = {

    name: 'codwarzone',
    description: 'Pulls COD Tracker link from given username and tag',

    execute(message, args) {

        if (!args.length) { return message.reply('Usage: -CODWarzone activision [username] [tag]'); }

        if (args[0] === 'battlenet') {

            if (args[1] === undefined || args[2] === undefined) return message.reply('Usage: -CODWarzone battlenet [username] [tag]');

            message.reply(`https://cod.tracker.gg/warzone/profile/battlenet/${args[1]}%23${args[2]}/overview`);

        }

        if (args[0] === 'activision') {

            if (args[1] === undefined || args[2] === undefined) return message.reply('Usage: -CODWarzone activision [username] [tag]');

            message.reply(`https://cod.tracker.gg/warzone/profile/atvi/${args[1]}%23${args[2]}/overview`);

        }

    },

};