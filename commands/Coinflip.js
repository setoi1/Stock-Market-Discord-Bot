module.exports = {

    name: 'coinflip',
    description: 'Flips a coin',
    usage: 'coinflip',
    guildOnly: true,

    execute(message) {

        const heads = Math.ceil(1);
        const tails = Math.floor(2);
        const flip = Math.floor(Math.random() * (tails - heads + 1) + heads);

        console.log(flip);

        if (flip === 1) message.reply('Heads');
        if (flip === 2) message.reply('Tails');

    },

};