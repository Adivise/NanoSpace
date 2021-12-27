const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../config.json');
const formatDuration = require('../../structures/formatduration.js')

module.exports = { 
    name: "seek",
    description: "Seek timestamp in the song!",
    botPerms: ["SEND_MESSAGES", "EMBED_LINKS", "CONNECT", "SPEAK"],
    options: [
        {
            name: "seconds",
            description: "The number of seconds to seek the timestamp by.",
            type: 4,
        }
    ],
    run: async (interaction, client) => {
        await interaction.deferReply({ ephemeral: false });
        const value = interaction.options.getInteger("seconds");
        const msg = await interaction.editReply(`**Loading please wait...**`);
        
		const player = client.manager.get(interaction.guild.id);
		if (!player) return msg.edit("No song/s currently playing within this guild.");
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

		if(value * 1000 >= player.playing.length || value < 0) return msg.edit('Cannot seek beyond length of song');
		await player.seek(value * 1000);

        const Duration = formatDuration(player.position);

        const seeked = new MessageEmbed()
            .setDescription("\`⏭\` | **Seeked to:** "+ `\`${Duration}\``)
            .setColor('#000001');

        msg.edit({ content: ' ', embeds: [seeked] });
            console.log(chalk.magenta(`[SLASHCOMMAND] Seek used by ${interaction.user.tag} from ${interaction.guild.name}`));
    }
}