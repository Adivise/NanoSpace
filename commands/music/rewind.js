const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../config.json');
const formatDuration = require('../../handlers/formatduration.js')

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

        const player = client.music.players.get(message.guild.id);

        if(!player) return msg.edit("No song/s currently playing in this guild.");

        const { channel } = message.member.voice;
        if(!channel || channel.id !== player.voiceChannel.id) return msg.edit("You need to be in a voice channel to use the skip command.");

        const CurrentDuration = formatDuration(player.position);

        if(args[0] && !isNaN(args[0])) {
			if((player.position - args[0] * 1000) > 0) {
                player.seek(player.position - args[0] * 1000);
                
                const rewind1 = new MessageEmbed()
                .setDescription("\`⏮\` | **Rewind to:** "+ `\`${CurrentDuration}\``)
                .setColor('#000001');

                msg.edit('', rewind1);
                    console.log(chalk.magenta(`  [Command]: Rewind used by ${message.author.tag} from ${message.guild.name}`));
			}
			else {
				return msg.edit('Cannot rewind beyond 00:00');
			}
		}
		else if(args[0] && isNaN(args[0])) {
			return msg.edit(`Invalid argument, must be a number.\nCorrect Usage: \`${prefix}forward <seconds>\``);
		}

		if(!args[0]) {
			if((player.position - rewindNum * 1000) > 0) {
                player.seek(player.position - rewindNum * 1000);
                
                const rewind2 = new MessageEmbed()
                .setDescription("\`⏮\` | **Rewind to:** "+ `\`${CurrentDuration}\``)
                .setColor('#000001');

                msg.edit('', rewind2);
                    console.log(chalk.magenta(`  [Command]: Rewind used by ${message.author.tag} from ${message.guild.name}`));
			}
			else {
				return msg.edit('Cannot rewind beyond 00:00');
			}
		}
	}
};