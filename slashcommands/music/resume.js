const { MessageEmbed } = require('discord.js');

module.exports = { 
    name: "resume",
    description: "Makes the bot pause/resume the music currently playing.",

    run: async (interaction, client) => {
        await interaction.deferReply({ ephemeral: false });
        const msg = await interaction.editReply('Loading please wait...');

		const player = client.manager.get(interaction.guild.id);
		if (!player) return msg.edit("No song/s currently playing within this guild.");
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")
        
        await player.pause(player.playing);

        const embed = new MessageEmbed()
            .setDescription(`\`⏯\` | **Song has been:** \`${player.playing ? "Resumed" : "Paused"}\``)
            .setColor('#000001');

        msg.edit({ content: " ", embeds: [embed] });
    }
}