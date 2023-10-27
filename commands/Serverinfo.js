module.exports = {
    name: 'serverinfo',
    description: 'display server information',
    usage: 'serverinfo',
    guildOnly: true,
    execute(message) {
        message.channel.send(`Creation Date: ${message.guild.createdAt}\nTotal Members: ${message.guild.memberCount}`);
    },
};