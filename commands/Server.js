module.exports = {
    
    name: 'server',
    description: 'Displays',
    
    execute(message, args) {

        message.channel.send(`Creation Date: ${message.guild.createdAt}\nTotal Members: ${message.guild.memberCount}`);
        
    },

};