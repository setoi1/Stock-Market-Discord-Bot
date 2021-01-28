const ytdl = require('ytdl-core');

module.exports = {

    name: 'tire',
    description: 'Im a tire',
    usage: 'tire',
    guildOnly: true,

    async execute(message) {

    if (!message.guild) return;

    if (message.content === '-tire') {

        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            connection.play(ytdl('https://www.youtube.com/watch?v=c1sAnP0PFC0', { filter: 'audioonly' }));
        }
        else {
            message.reply('You need to be in the voice channel for this command to work');
        }
    }

    },

};