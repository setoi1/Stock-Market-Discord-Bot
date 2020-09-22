module.exports = {

    name: 'opgg',
    description: 'Allows single or multiple names for op.gg',
    usage: '<usernames 1>, <username 2>, <username 3>, ...',
    args: true,
    guildOnly: true,

    execute(message, args) {

        message.reply(`https://na.op.gg/summoner/userName=${args}`);

    },

};