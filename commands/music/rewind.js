const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const { PREFIX } = require('../../config.json');
const formatDuration = require('../../structures/formatduration.js')

const rewindNum = 10;

module.exports = { 
    config: {
        name: "rewind",
        aliases: [],
        description: "Rewind timestamp in the song!",
        accessableby: "Member",
        category: "music",
        usage: "<seconds>"
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send(`**Loading please wait...**`);

		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit("No song/s currently playing within this guild.");
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

        const CurrentDuration = formatDuration(player.position);

        if(args[0] && !isNaN(args[0])) {
			if((player.position - args[0] * 1000) > 0) {
                await player.seek(player.position - args[0] * 1000);
                
                const rewind1 = new MessageEmbed()
                .setDescription("\`⏮\` | **Rewind to:** "+ `\`${CurrentDuration}\``)
                .setColor('#000001');

                msg.edit({ content: " ", embeds: [rewind1] });
                    console.log(chalk.magenta(`[COMMAND] Rewind used by ${message.author.tag} from ${message.guild.name}`));
			}
			else {
				return msg.edit('Cannot rewind beyond 00:00');
			}
		}
		else if(args[0] && isNaN(args[0])) {
			return msg.edit(`Invalid argument, must be a number.\nCorrect Usage: \`${PREFIX}rewind <seconds>\``);
		}

		if(!args[0]) {
			if((player.position - rewindNum * 1000) > 0) {
                await player.seek(player.position - rewindNum * 1000);
                
                const rewind2 = new MessageEmbed()
                .setDescription("\`⏮\` | **Rewind to:** "+ `\`${CurrentDuration}\``)
                .setColor('#000001');

                msg.edit({ content: " ", embeds: [rewind2] });
                    console.log(chalk.magenta(`[COMMAND] Rewind used by ${message.author.tag} from ${message.guild.name}`));
			}
			else {
				return msg.edit('Cannot rewind beyond 00:00');
			}
		}
	}
};