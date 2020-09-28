const chalk = require('chalk');
const delay = require('delay');

module.exports = {
    config: {
        name: "loopall",
        aliases: ["repeatall", 'lq', 'loopqueue'],
        description: "loop the song in queue playing.",
        accessableby: "Member",
        category: "music"
    },
    run: async (bot, message, args) => {
		const msg = await message.channel.send('Loading please wait...');

		const player = bot.music.players.get(message.guild.id);

		if (player.queueRepeat === true) {
            await delay(1500);
			player.setQueueRepeat(false)
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
};