module.exports = {

    name: 'random',
    description: 'Provides a random number between the specified arguments',
    usage: '<min> <max>',
    args: true,
    guildOnly: true,

    execute(message, args) {

        if (args[0] === undefined || args[1] === undefined) return message.reply('Two numbers must be inputted');

            const min = Math.ceil(args[0]);
            const max = Math.floor(args[1]);

            const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

            message.reply(randomNumber);

    },

};