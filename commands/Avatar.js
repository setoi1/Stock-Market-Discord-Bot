module.exports = {

    name: 'avatar',
    description: 'random avatar',
    guildOnly: true,

    execute(message) {

        message.reply({

            files: ['https://cdn.discordapp.com/attachments/755652440933662740/756556133560483931/image0.jpg'],

        });

    },

};