const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'List all commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',

    execute(message, args) {

        const data = [];
        const { commands } = message.client;

        if (!args.length) {

            data.push('Here\'s a list of all the commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nType \`${prefix}help [command name]\` to get info on a specific command`);

            return message.author.send(data, { split: true })

            .then(() => {

                if (message.channel.type === 'dm') return;

                message.reply('Commands sent to DMs');

            })

            .catch(error => {

                console.error(`Could not send help DM to ${message.author.tag}.\n`, error);

            });

        }

    },

};