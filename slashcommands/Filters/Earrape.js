const delay = require('delay');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    name: "earrape",
    description: "Destroy your ear!",
    
    run: async (interaction, client, user, language) => {
        await interaction.deferReply({ ephemeral: false });
        const msg = await interaction.editReply(`${client.i18n.get(language, "filters", "filter_loading", {
            name: "earrape"
            })}`);

            const player = client.manager.get(interaction.guild.id);
            if(!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
            const { channel } = interaction.member.voice;
            if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);
    
		await player.setVolume(500);
        const data = {
            op: 'filters',
            guildId: interaction.guild.id,
        }
        await player.node.send(data);

        const earrapped = new MessageEmbed()
            .setDescription(`${client.i18n.get(language, "filters", "filter_on", {
                name: "earrape"
            })}`)
            .setColor(client.color);

        await delay(3000);
        msg.edit({ content: " ", embeds: [earrapped] });
    }
};