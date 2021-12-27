const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    name: "skip",
    description: "Skips the song currently playing.",
    botPerms: ["SEND_MESSAGES", "EMBED_LINKS", "CONNECT", "SPEAK"],

    run: async (interaction, client) => {
        await interaction.deferReply({ ephemeral: false });
        const msg = await interaction.editReply(`**Skipping the song...**`);

		const player = client.manager.get(interaction.guild.id);
		if (!player) return msg.edit("No song/s currently playing within this guild.");
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

        await player.stop();

        const skipped = new MessageEmbed()
            .setDescription("\`⏭\` | **Song has been:** `Skipped`")
            .setColor('#000001');

        msg.edit({ content: " ", embeds: [skipped] });
            console.log(chalk.magenta(`[SLASHCOMMAND] Skip used by ${interaction.user.tag} from ${interaction.guild.name}`));
    }
}