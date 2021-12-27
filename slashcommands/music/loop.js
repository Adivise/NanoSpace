const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "loop",
    description: "Loop song in queue type all/current!",
    botPerms: ["SEND_MESSAGES", "EMBED_LINKS", "CONNECT", "SPEAK"],
    options: [
        {
            name: "type",
            description: "Type of loop",
            type: 3,
        }
    ],
    
    run: async (interaction, client) => {
        await interaction.deferReply({ ephemeral: false });
        const value = interaction.options.getString("type");
		const msg = await interaction.editReply('**Loading please wait...**');

		const player = client.manager.get(interaction.guild.id);
		if (!player) return msg.edit("No song/s currently playing within this guild.");
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

		if (!value || value.toLowerCase() == 'current') {
			if (player.trackRepeat === false) {
				player.setTrackRepeat(true);

				const looped = new MessageEmbed()
					.setDescription(`\`🔁\` | **Song is loop:** \`Current\``)
					.setColor('#000001');

					msg.edit({ content: " ", embeds: [looped] });
						console.log(chalk.magenta(`[SLASHCOMMAND] Loop used by ${interaction.user.tag} from ${interaction.guild.name}`));
			}
			else {
				player.setTrackRepeat(false);

				const unlooped = new MessageEmbed()
					.setDescription(`\`🔁\` | **Song is unloop:** \`Current\``)
					.setColor('#000001');

					msg.edit({ content: " ", embeds: [unlooped] });
						console.log(chalk.magenta(`[SLASHCOMMAND] Unloop used by ${interaction.user.tag} from ${interaction.guild.name}`));
			}
		}
		else if (value == 'all') {
			if (player.queueRepeat === true) {
				player.setQueueRepeat(false);

				const unloopall = new MessageEmbed()
					.setDescription(`\`🔁\` | **Song is unloop:** \`All\``)
					.setColor('#000001');

					msg.edit({ content: " ", embeds: [unloopall] });
						console.log(chalk.magenta(`[SLASHCOMMAND] Unloopall used by ${interaction.user.tag} from ${interaction.guild.name}`));
			}
			else {
				player.setQueueRepeat(true);

				const loopall = new MessageEmbed()
					.setDescription(`\`🔁\` | **Song is loop:** \`All\``)
					.setColor('#000001');

					msg.edit({ content: " ", embeds: [loopall] });
						console.log(chalk.magenta(`[SLASHCOMMAND] Loopall used by ${interaction.user.tag} from ${interaction.guild.name}`));
			}
		}
	}
};