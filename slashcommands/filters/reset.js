const delay = require('delay');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    name: "reset",
    description: "Reseting all filters",
    
    run: async (interaction, client, user, language) => {
        await interaction.deferReply({ ephemeral: false });
        const msg = await interaction.editReply(`${client.i18n.get(language, "filters", "reset_loading")}`);

		const player = client.manager.get(interaction.guild.id);
		if(!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
		const { channel } = interaction.member.voice;
		if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);

		const data = {
            op: 'filters',
            guildId: interaction.guild.id,
        }

        await player.node.send(data);
        await player.setVolume(100);
        
        const resetted = new MessageEmbed()
            .setDescription(`${client.i18n.get(language, "filters", "reset_on")}`)
            .setColor(client.color);

        await delay(5000);
        msg.edit({ content: " ", embeds: [resetted] });
   }
};