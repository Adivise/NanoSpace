const chalk = require('chalk');
const delay = require('delay');

module.exports = {
    config: {
        name: "loop",
        aliases: ["repeat"],
        description: "loop the song currently playing.",
        accessableby: "Member",
        category: "music",
        usage: "<current, all>"
    },
    run: async (bot, message, args) => {
		const msg = await message.channel.send('Loading please wait...');

		const player = bot.music.players.get(message.guild.id);

		if (!args[0] || args[0].toLowerCase() == 'current') {
			if (player.trackRepeat === false) {
				await delay(1500);
				player.setTrackRepeat(true);
					msg.edit(`\`🔁\` | **Song is loop:** \`Current\``)
						console.log(chalk.magenta(`  [Command]: Loop used by ${message.author.tag} from ${message.guild.name}`));
			}
			else {
				await delay(1500);
				player.setTrackRepeat(false);
					msg.edit(`\`🔁\` | **Song is unloop:** \`Current\``)
						console.log(chalk.magenta(`  [Command]: Unloop used by ${message.author.tag} from ${message.guild.name}`));
			}
		}
		else if (args[0] == 'all') {
			if (player.queueRepeat === true) {
				await delay(1500);
				player.setQueueRepeat(false);
					msg.edit(`\`🔁\` | **Song is unloop:** \`All\``)
						console.log(chalk.magenta(`  [Command]: Unloopall used by ${message.author.tag} from ${message.guild.name}`));
			}
			else {
				await delay(1500);
				player.setQueueRepeat(true);
					msg.edit(`\`🔁\` | **Song is loop:** \`All\``)
						console.log(chalk.magenta(`  [Command]: Loopall used by ${message.author.tag} from ${message.guild.name}`));
			}
		}
	}
};