const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const GPrefix = require('../../settings/models/Prefix.js');

module.exports = {
    config: {
        name: "prefix",
        aliases: ["setprefix"],
        usage: "<input>",
        category: "Utilities",
        description: "Change the prefix for the bot",
        accessableby: "Members"
    },
    run: async (client, message, args, user, language, prefix) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return message.channel.send(`${client.i18n.get(language, "utilities", "prefix_perm")}`);
        if(!args[0]) return message.channel.send(`${client.i18n.get(language, "utilities", "prefix_arg")}`);
        if(args[0].length > 10) return message.channel.send(`${client.i18n.get(language, "utilities", "prefix_length")}`);

        const newPrefix = await GPrefix.findOne({ guild: message.guild.id });
        if(!newPrefix) {
            const newPrefix = new GPrefix({
                guild: message.guild.id,
                prefix: args[0]
            });
            newPrefix.save().then(() => {
                const embed = new EmbedBuilder()
                .setDescription(`${client.i18n.get(language, "utilities", "prefix_set", {
                    prefix: args[0]
                })}`)
                .setColor(client.color)

                message.channel.send({ embeds: [embed] });
            }
            ).catch(() => {
                message.channel.send(`${client.i18n.get(language, "utilities", "prefix_error")}`);
            });
        }
        else if(newPrefix) {
            newPrefix.prefix = args[0];
            newPrefix.save().then(() => {
                const embed = new EmbedBuilder()
                .setDescription(`${client.i18n.get(language, "utilities", "prefix_change", {
                    prefix: args[0]
                })}`)
                .setColor(client.color)
    
                message.channel.send({ embeds: [embed] });
            }
            ).catch(() => {
                message.channel.send(`${client.i18n.get(language, "utilities", "prefix_error")}`);
            });
        }
    }
}
