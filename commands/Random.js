module.exports = {

    name: 'randomnumber',
    description: 'Provides a random number between the specified arguments',
    usage: '<min> <max>',
    args: true,

    execute(message, args) {

        if (args[0] === undefined || args[1] === undefined) return message.reply('Two numbers must be inputted');

        const randomNumber = Math.floor(Math.random() * (args[1] - args[0]) + args[0]);

        message.channel.send(`Number: ${randomNumber}`);

    },

};