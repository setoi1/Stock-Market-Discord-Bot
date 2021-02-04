module.exports = {

    name: 'serverinfo',
    description: 'Displays league information from op.gg',
    usage: 'serverinfo',
    guildOnly: true,

    execute(message) {

        message.channel.send(`Creation Date: ${message.guild.createdAt}\nTotal Members: ${message.guild.memberCount}`);

    },

};