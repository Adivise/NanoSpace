const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const formatDuration = require('../../structures/formatduration.js')

const fastForwardNum = 10;

module.exports = { 
    name: "forward",
    description: "Forward timestamp in the song!",
    botPerms: ["SEND_MESSAGES", "EMBED_LINKS", "CONNECT", "SPEAK"],
    options: [
        {
            name: "seconds",
            description: "The number of seconds to forward the timestamp by.",
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
        const { duration } = player.queue[0];

		if (value && !isNaN(value)) {
			if((player.position + value * 1000) < duration) {
                player.seek(player.position + value * 1000);
                
                const forward1 = new MessageEmbed()
                .setDescription("\`⏭\` | **Forward to:** "+ `\`${CurrentDuration}\``)
                .setColor('#000001');

                msg.edit({ content: " ", embeds: [forward1] });
                    console.log(chalk.magenta(`[SLASHCOMMAND] Forward used by ${interaction.user.tag} from ${interaction.guild.name}`));

			} else { 
                return msg.edit('Cannot forward beyond the song\'s duration.'); 
            }
		}
		else if (value && isNaN(value)) { 
            return interaction.reply(`Invalid argument, must be a number.\nCorrect Usage: \`/forward <seconds>\``); 
        }

		if (!value) {
			if((player.position + fastForwardNum * 1000) < duration) {
                player.seek(player.position + fastForwardNum * 1000);
                
                const forward2 = new MessageEmbed()
                .setDescription("\`⏭\` | **Forward to:** "+ `\`${CurrentDuration}\``)
                .setColor('#000001');

                msg.edit({ content: " ", embeds: [forward2] });
                    console.log(chalk.magenta(`[SLASHCOMMAND] Forward used by ${interaction.author.tag} from ${interaction.guild.name}`));

			} else {
				return msg.edit('Cannot forward beyond the song\'s duration.');
			}
		}
	}
};