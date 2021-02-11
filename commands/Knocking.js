const ytdl = require('ytdl-core');

module.exports = {

    name: 'knocking',
    description: 'knocking',
    usage: 'knocking',
    guildOnly: true,

    async execute(message) {

        if (!message.guild) return;

        if (message.content === '-knocking') {
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                connection.play(ytdl('https://www.youtube.com/watch?v=WkwNS1AsbE0', { filter: 'audioonly' }), { volume: 0.20 });
        }
            else {
                message.reply('You need to be in the voice channel for this command to work');
            }
        }

    },
};