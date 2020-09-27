module.exports = {

    name: 'time',
    description: 'Pulls time from location',
    usage: '<location>',
    args: true,
    guildOnly: true,

    execute(message, args) {

        if (args[0] === undefined || args[1] === undefined) return message.reply('Input a location');

            

    },

};