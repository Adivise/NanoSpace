const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const Premium = require('../../settings/models/Premium.js');

module.exports = { 
    config: {
        name: "premium",
        aliases: [],
        description: "Add members to the premium list",
        accessableby: "Owner",
        category: "premium",
    },
    run: async (client, message, args) => {
        if(message.author.id != client.owner) return message.channel.send("You're NOT the client owner!")
        console.log(chalk.magenta(`[COMMAND] Premium used by ${message.author.tag} from ${message.guild.name}`));

        if(!args[0]) return message.channel.send(`**Please specify a member id** Example: \`${client.prefix}premium <member id>\``);

        const member = args[0];
        if(member != client.users.cache.get(member)) return message.channel.send(`**Please give me the user's id!**`);

        const premium = await Premium.findOne({ member: member });

        if(!premium) {
            const newPremium = new Premium({
                member: member,
                premium: true,
                created: Date.now(),
            });

            await newPremium.save();

            const embed = new MessageEmbed()
                .setTitle("Premium")
                .setDescription(`**\`${client.users.cache.get(member).tag}\` (${client.users.cache.get(member).id}) is now premium!**`)
                .setThumbnail(client.users.cache.get(member).displayAvatarURL())
                .setColor('#000001')
                .setFooter({ text: `Added by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
                .setTimestamp()

            message.channel.send({ embeds: [embed] });
        } else if(premium) {
;
            await premium.delete();

            const embed = new MessageEmbed()
                .setTitle("Premium")
                .setDescription(`**\`${client.users.cache.get(member).tag}\` (${client.users.cache.get(member).id}) is no longer premium!**`)
                .setThumbnail(client.users.cache.get(member).displayAvatarURL())
                .setColor('#000001')
                .setFooter({ text: `Removed by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
                .setTimestamp()

            message.channel.send({ embeds: [embed] });
        }
    }
}
