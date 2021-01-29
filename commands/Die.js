module.exports = {

    name: 'die',
    description: 'im dead',
    usage: 'die',
    guildOnly: true,

    async execute(message) {

        if (!message.guild) return;

        if (message.content === '-die') {

            if (message.member.voice.channel) {
                let connection = await message.member.voice.channel.join();
                connection.play('./mp4files/OOF.mp3', { volume: 1.0 });
                setTimeout(() => { connection = message.member.voice.channel.leave(); }, 4000);
            }

            else {
                message.reply('You need to be in the voice channel for this command to work');
            }
        }
    },
};