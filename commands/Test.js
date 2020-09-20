module.exports = {

    name: 'test',
    description: 'Checks if the bot is online or not',

    execute(message) {

        message.channel.send(`${client.user.tag} is online.`);

    },

};