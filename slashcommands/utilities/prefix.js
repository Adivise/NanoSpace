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
    run: async (interaction, client) => {
        await interaction.deferReply({ ephemeral: false });

        const msg = await interaction.editReply(`**Loading please wait...**`);
        const input = interaction.options.getString("input");

        if (!interaction.member.permissions.has('MANAGE_GUILD')) return msg.edit('You need the `MANAGE_GUILD` permission to use this command.');
        if(input.length > 10) return msg.edit(`**The prefix can't be longer than 10 characters!**`);

        const newPrefix = await GPrefix.findOne({ guild: interaction.guild.id });
        if(!newPrefix) {
            const newPrefix = new GPrefix({
                guild: interaction.guild.id,
                prefix: input
            });
            newPrefix.save().then(() => {
                const embed = new MessageEmbed()
                .setDescription(`**The prefix has been set to \`${input}\`**`)
                .setColor('#000001')

                msg.edit({ embeds: [embed] });
            }
            ).catch(() => {
                msg.edit(`**An error occured while setting the prefix!**`);
            });
        }
        else if(newPrefix) {
            newPrefix.prefix = input;
            newPrefix.save().then(() => {
                const embed = new MessageEmbed()
                .setDescription(`**The prefix has been changed to \`${input}\`**`)
                .setColor('#000001')
    
                msg.edit({ embeds: [embed] });
            }
            ).catch(() => {
                msg.edit(`**An error occured while changing the prefix!**`);
            });
        }
    }
}
