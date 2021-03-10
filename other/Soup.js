const ytdl = require('ytdl-core');

module.exports = {

    name: 'soup',
    description: 'im a soup',
    usage: 'soup',
    guildOnly: true,

    async execute(message) {

        if (!message.guild) return;

        if (message.content === '-soup') {
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                connection.play(ytdl('https://www.youtube.com/watch?v=vjV8DjQktLU', { filter: 'audioonly' }));
            }
            else {
                message.reply('You need to be in the voice channel for this command to work');
            }
        }

    },
};