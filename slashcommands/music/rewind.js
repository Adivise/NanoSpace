const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const formatDuration = require('../../structures/formatduration.js')

const rewindNum = 10;

module.exports = { 
    name: "rewind",
    description: "Rewind timestamp in the song!",
    botPerms: ["SEND_MESSAGES", "EMBED_LINKS", "CONNECT", "SPEAK"],
    options: [
        {
            name: "seconds",
            description: "The number of seconds to rewind the timestamp by.",
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

        const CurrentDuration = formatDuration(player.position);

        if(value && !isNaN(value)) {
			if((player.position - value * 1000) > 0) {
                await player.seek(player.position - value * 1000);
                
                const rewind1 = new MessageEmbed()
                .setDescription("\`⏮\` | **Rewind to:** "+ `\`${CurrentDuration}\``)
                .setColor('#000001');

                msg.edit({ content: " ", embeds: [rewind1] });
                    console.log(chalk.magenta(`[SLASHCOMMAND] Rewind used by ${interaction.user.tag} from ${interaction.guild.name}`));
			}
			else {
				return msg.edit('Cannot rewind beyond 00:00');
			}
		}
		else if(value && isNaN(value)) {
			return msg.edit(`Invalid argument, must be a number.\nCorrect Usage: \`/rewind <seconds>\``);
		}

		if(!value) {
			if((player.position - rewindNum * 1000) > 0) {
                await player.seek(player.position - rewindNum * 1000);
                
                const rewind2 = new MessageEmbed()
                .setDescription("\`⏮\` | **Rewind to:** "+ `\`${CurrentDuration}\``)
                .setColor('#000001');

                msg.edit({ content: " ", embeds: [rewind2] });
                    console.log(chalk.magenta(`[SLASHCOMMAND] Rewind used by ${interaction.user.tag} from ${interaction.guild.name}`));
			}
			else {
				return msg.edit('Cannot rewind beyond 00:00');
			}
		}
	}
};