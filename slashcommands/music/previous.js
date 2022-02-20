const { MessageEmbed } = require('discord.js');

module.exports = { 
    name: "previous",
    description: "Previous a song",

    run: async (interaction, client) => {
        await interaction.deferReply({ ephemeral: false });
        const msg = await interaction.editReply(`**Loading please wait...**`);

		const player = client.manager.get(interaction.guild.id);
		if (!player) return msg.edit("No song/s currently playing within this guild.");
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

        if (!player.queue.previous) return msg.edit("No previous song/s found.");

        await player.queue.unshift(player.queue.previous);
        await player.stop();

        const embed = new MessageEmbed()
            .setDescription("\`⏮\` | **Song has been:** `Previous`")
            .setColor('#000001');

        msg.edit({ content: " ", embeds: [embed] });
    }
}