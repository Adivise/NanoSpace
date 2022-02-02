const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const Premium = require('../../settings/models/PremiumGuild.js');

module.exports = { 
    config: {
        name: "premiumguild",
        aliases: [],
        description: "Add guilds to the premium list",
        accessableby: "Owner",
        category: "premium",
    },
    run: async (client, message, args) => {
        if(message.author.id != client.owner) return message.channel.send("You're the client the owner!")
        console.log(chalk.magenta(`[COMMAND] Premiumguild used by ${message.author.tag} from ${message.guild.name}`));

        if(!args[0]) return message.channel.send(`**Please specify a guild id** Example: \`${client.prefix}premiumguild <guild id>\``);

        const guild = args[0];
        if(guild != client.guilds.cache.get(guild)) return message.channel.send(`**Please give me the guild's id!** (Make sure the bot is in that Server.)`);

        const premium = await Premium.findOne({ guild: guild });

        if(!premium) {
            const newPremium = new Premium({
                guild: guild,
                premium: true,
                created: Date.now(),
            });

            await newPremium.save();

            const embed = new MessageEmbed()
                .setTitle("Premium")
                .setDescription(`**\`${client.guilds.cache.get(guild).name}\` (${client.guilds.cache.get(guild).id}) is now premium! **`)
                .setThumbnail(client.guilds.cache.get(guild).iconURL())
                .setColor('#000001')
                .setFooter({ text: `Added by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
                .setTimestamp()

            message.channel.send({ embeds: [embed] });
        } else if(premium) {
            await premium.delete();

            const embed = new MessageEmbed()
                .setTitle("Premium")
                .setDescription(`**\`${client.guilds.cache.get(guild).name}\` (${client.guilds.cache.get(guild).id}) is no longer premium! **`)
                .setThumbnail(client.guilds.cache.get(guild).iconURL())
                .setColor('#000001')
                .setFooter({ text: `Removed by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
                .setTimestamp()

            message.channel.send({ embeds: [embed] });
        }
    }
}
