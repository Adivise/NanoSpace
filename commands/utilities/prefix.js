const { MessageEmbed } = require('discord.js');
const GPrefix = require('../../settings/models/Prefix.js');

module.exports = {
    config: {
        name: "prefix",
        aliases: ["setprefix"],
        usage: "",
        category: "utilities",
        description: "Change the prefix for the bot",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_GUILD')) return message.reply('You need the `MANAGE_GUILD` permission to use this command.');
        console.log(chalk.magenta(`[COMMAND] Prefix used by ${message.author.tag} from ${message.guild.name}`));
        if(!args[0]) return message.channel.send(`**Please specify a prefix!**`);
        if(args[0].length > 10) return message.channel.send(`**The prefix can't be longer than 10 characters!**`);

        const newPrefix = await GPrefix.findOne({ guild: message.guild.id });
        if(!newPrefix) {
            const newPrefix = new GPrefix({
                guild: message.guild.id,
                prefix: args[0]
            });
            newPrefix.save().then(() => {
                const embed = new MessageEmbed()
                .setDescription(`**The prefix has been set to \`${args[0]}\`!**`)
                .setColor('#000001')

                message.channel.send({ embeds: [embed] });
            }
            ).catch(() => {
                message.channel.send(`**An error occured while setting the prefix!**`);
            });
        }
        else if(newPrefix) {
            newPrefix.prefix = args[0];
            newPrefix.save().then(() => {
                const embed = new MessageEmbed()
                .setDescription(`**The prefix has been changed to \`${args[0]}\`!**`)
                .setColor('#000001')
    
                message.channel.send({ embeds: [embed] });
            }
            ).catch(() => {
                message.channel.send(`**An error occured while changing the prefix!**`);
            });
        }
    }
}
