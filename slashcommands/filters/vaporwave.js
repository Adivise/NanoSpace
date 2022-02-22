const delay = require('delay');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    name: "vaporwave",
    description: "Turning on vaporwave filter",

    run: async (interaction, client, user, language) => {
        await interaction.deferReply({ ephemeral: false });
        const msg = await interaction.editReply(`${client.i18n.get(language, "filters", "filter_loading", {
            name: "vaporwave"
            })}`);

            const player = client.manager.get(interaction.guild.id);
            if(!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
            const { channel } = interaction.member.voice;
            if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);

            const data = {
                op: 'filters',
                guildId: interaction.guild.id,
                equalizer: [
                    { band: 1, gain: 0.3 },
                    { band: 0, gain: 0.3 },
                ],
                timescale: { 
                    pitch: 0.5 
                },
                tremolo: { 
                    depth: 0.3, 
                    frequency: 14 
                },
            }

            await player.node.send(data);

        const vaporwaved = new MessageEmbed()
            .setDescription(`${client.i18n.get(language, "filters", "filter_on", {
                name: "vaporwave"
            })}`)
            .setColor('#000001');

        await delay(5000);
        msg.edit({ content: " ", embeds: [vaporwaved] });
   }
};