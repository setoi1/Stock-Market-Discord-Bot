const ytdl = require('ytdl-core');

module.exports = {

    name: 'kabuki',
    description: 'kabuki',
    usage: 'kabuki',
    guildOnly: true,

    async execute(message) {

        if (!message.guild) return;

        if (message.content === '-kabuki') {
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                connection.play(ytdl('https://www.youtube.com/watch?v=VKMw2it8dQY', { filter: 'audioonly' }));
            }
            else {
                message.reply('You need to be in the voice channel for this command to work');
            }
        }

    },
};