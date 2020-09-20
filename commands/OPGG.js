module.exports = {

    name: 'opgg',
    description: 'Allows single or multiple names for op.gg',

    execute(message, args) {

        if (!args.length) return message.reply('Add summoner name(s) after -opgg');

        message.reply(`https://na.op.gg/summoner/userName=${args}`);

    },

};