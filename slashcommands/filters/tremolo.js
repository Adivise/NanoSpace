const delay = require('delay');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    name: "tremolo",
    description: "Turning on tremolo filter",
    
    run: async (interaction, client, user, language) => {
        await interaction.deferReply({ ephemeral: false });
        const msg = await interaction.editReply(`${client.i18n.get(language, "filters", "filter_loading", {
            name: "tremolo"
            })}`);

            const player = client.manager.get(interaction.guild.id);
            if(!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
            const { channel } = interaction.member.voice;
            if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);

            const data = {
                op: 'filters',
                guildId: interaction.guild.id,
                tremolo: {
                    frequency: 4.0,
                    depth: 0.75
                },
            }

            await player.node.send(data);

        const embed = new MessageEmbed()
            .setDescription(`${client.i18n.get(language, "filters", "filter_on", {
                name: "trembolo"
            })}`)
            .setColor(client.color);

        await delay(5000);
        msg.edit({ content: " ", embeds: [embed] });
   }
};