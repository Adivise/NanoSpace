const chalk = require('chalk');
const { prefix } = require('../../config.json');
const formatDuration = require('../../handlers/formatduration.js')

const fastForwardNum = 10;

module.exports = { 
    config: {
        name: "forward",
        aliases: [],
        description: "Forward timestamp in the song!",
        accessableby: "Member",
        category: "music",
        usage: "<seconds>"
    },

    run: async (bot, message, args) => {
        const msg = await message.channel.send(`**Loading please wait...**`);
           
        const player = bot.music.players.get(message.guild.id);
        if(!player) return msg.edit("No song/s currently playing in this guild.");

        const { voiceChannel } = message.member;
        if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return msg.edit("You need to be in a voice channel to use the skip command.");

        const CurrentDuration = formatDuration(player.position);
        const { duration } = player.queue[0];

		if (args[0] && !isNaN(args[0])) {
			if((player.position + args[0] * 1000) < duration) {
				player.seek(player.position + args[0] * 1000);

                msg.edit("\`⏭\` | **Forward to:** "+ `\`${CurrentDuration}\``);
                    console.log(chalk.magenta(`  [Command]: Forward used by ${message.author.tag} from ${message.guild.name}`));

			} else { 
                return msg.edit('Cannot forward beyond the song\'s duration.'); 
            }
		}
		else if (args[0] && isNaN(args[0])) { 
            return message.reply(`Invalid argument, must be a number.\nCorrect Usage: \`${prefix}forward <seconds>\``); 
        }

		if (!args[0]) {
			if((player.position + fastForwardNum * 1000) < duration) {
				player.seek(player.position + fastForwardNum * 1000);

                msg.edit("\`⏭\` | **Forward to:** "+ `\`${CurrentDuration}\``);
                    console.log(chalk.magenta(`  [Command]: Forward used by ${message.author.tag} from ${message.guild.name}`));

			} else {
				return msg.edit('Cannot forward beyond the song\'s duration.');
			}
		}
	}
};