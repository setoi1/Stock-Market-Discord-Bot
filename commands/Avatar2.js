module.exports = {

    name: 'avatar2',
    description: 'random avatar',
    guildOnly: true,

    execute(message) {

        message.reply({

            files: ['https://cdn.discordapp.com/attachments/755675111792574565/766122073558614066/straightface.jpg'],

        });

    },

};