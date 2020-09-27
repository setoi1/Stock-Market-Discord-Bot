module.exports = {

    name: 'temp',
    description: 'Pulls temperature from location',
    usage: '<location>',
    args: true,
    guildOnly: true,

    execute(message, args) {

        if (args[0] === undefined || args[1] === undefined) return message.reply('Input a location');

            

    },

};