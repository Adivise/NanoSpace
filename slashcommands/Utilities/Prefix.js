const { MessageEmbed } = require('discord.js');
const GPrefix = require('../../settings/models/Prefix.js');

module.exports = {
    name: "prefix",
    description: "Change the prefix for the bot",
    options: [
        {
            name: "input",
            description: "The new prefix",
            required: true,
            type: 3
        }
    ],
    ownerOnly: false,
    run: async (interaction, client, user, language) => {
        await interaction.deferReply({ ephemeral: false });

     //   const msg = await interaction.editReply(`**Loading please wait...**`);
        const input = interaction.options.getString("input");

        if (!interaction.member.permissions.has('MANAGE_GUILD')) return interaction.editReply(`${client.i18n.get(language, "utilities", "prefix_perm")}`);
        if(input.length > 10) return interaction.editReply(`${client.i18n.get(language, "utilities", "prefix_length")}`);

        const newPrefix = await GPrefix.findOne({ guild: interaction.guild.id });
        if(!newPrefix) {
            const newPrefix = new GPrefix({
                guild: interaction.guild.id,
                prefix: input
            });
            newPrefix.save().then(() => {
                const embed = new MessageEmbed()
                .setDescription(`${client.i18n.get(language, "utilities", "prefix_set", {
                    prefix: input
                })}`)
                .setColor(client.color)

                interaction.editReply({ embeds: [embed] });
            }
            ).catch(() => {
                interaction.editReply(`${client.i18n.get(language, "utilities", "prefix_error")}`);
            });
        }
        else if(newPrefix) {
            newPrefix.prefix = input;
            newPrefix.save().then(() => {
                const embed = new MessageEmbed()
                .setDescription(`${client.i18n.get(language, "utilities", "prefix_change", {
                    prefix: input
                })}`)
                .setColor(client.color)
    
                interaction.editReply({ embeds: [embed] });
            }
            ).catch(() => {
                interaction.editReply(`${client.i18n.get(language, "utilities", "prefix_error")}`);
            });
        }
    }
}

