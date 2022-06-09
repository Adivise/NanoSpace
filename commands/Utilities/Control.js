const { MessageEmbed } = require('discord.js');
const GControl = require('../../settings/models/Control.js');
module.exports = {
    config: {
        name: "control",
        aliases: ["setcontrol"],
        usage: "<input>",
        category: "Utilities",
        description: "Change the player mode for the bot",
        accessableby: "Members"
    },
    run: async (client, message, args, user, language, prefix) => {
        if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.send(`${client.i18n.get(language, "utilities", "control_perm")}`);
        if(!args[0]) return message.channel.send(`${client.i18n.get(language, "utilities", "control_arg")}`);
        if(args[0] !== 'enable' && args[0] !== 'disable') return message.channel.send(`${client.i18n.get(language, "utilities", "control_invaild")}`);

        const guildControl = await GControl.findOne({ guild: message.guild.id });
        if(!guildControl) {
            const guildControl = new GControl({
                guild: message.guild.id,
                playerControl: args[0]
            });
            guildControl.save().then(() => {
                const embed = new MessageEmbed()
                .setDescription(`${client.i18n.get(language, "utilities", "control_set", {
                    playerControl: args[0]
                })}`)
                .setColor(client.color)

                message.channel.send({ embeds: [embed] });
            }
            ).catch(() => {
                message.channel.send(`${client.i18n.get(language, "utilities", "control_error")}`);
            });
        }
        else if(guildControl) {
            guildControl.playerControl = args[0];
            guildControl.save().then(() => {
                const embed = new MessageEmbed()
                .setDescription(`${client.i18n.get(language, "utilities", "control_change", {
                    playerControl: args[0]
                })}`)
                .setColor(client.color)
    
                message.channel.send({ embeds: [embed] });
            }
            ).catch(() => {
                message.channel.send(`${client.i18n.get(language, "utilities", "control_error")}`);
            });
        }
    }
}