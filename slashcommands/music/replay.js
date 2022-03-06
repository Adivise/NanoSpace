const { MessageEmbed } = require('discord.js');

module.exports = { 
    name: "replay",
    description: "Replay the current song!",
    run: async (interaction, client, user, language) => {
        await interaction.deferReply({ ephemeral: false });
        const msg = await interaction.editReply(`${client.i18n.get(language, "music", "replay_loading")}`);

		const player = client.manager.get(interaction.guild.id);
		if (!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);

        await player.seek(0);

        const embed = new MessageEmbed()
            .setDescription(`${client.i18n.get(language, "music", "replay_msg")}`)
            .setColor(client.color);

        msg.edit({ content: " ", embeds: [embed] });
    }
}