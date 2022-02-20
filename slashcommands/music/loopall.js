const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "loopall",
    description: "loop the song in queue playing.",

    run: async (interaction, client) => {
        await interaction.deferReply({ ephemeral: false });
		const msg = await interaction.editReply('**Loading please wait...**');

		const player = client.manager.get(interaction.guild.id);
		if (!player) return msg.edit("No song/s currently playing within this guild.");
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

		if (player.queueRepeat === true) {
            player.setQueueRepeat(false)
            
            const unloopall = new MessageEmbed()
                .setDescription(`\`🔁\` | **Song is unloop:** \`All\``)
                .setColor('#000001');

                msg.edit({ content: ' ', embeds: [unloopall] });
		}
		else {
            player.setQueueRepeat(true);
            
            const loopall = new MessageEmbed()
                .setDescription(`\`🔁\` | **Song is loop:** \`All\``)
                .setColor('#000001');

                msg.edit({ content: ' ', embeds: [loopall] });
		}
	}
};