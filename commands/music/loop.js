const chalk = require('chalk');
const delay = require('delay');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "loop",
        aliases: ["repeat"],
        description: "loop the song currently playing.",
        accessableby: "Member",
        category: "music",
        usage: "<current, all>"
    },
    run: async (client, message, args) => {
		const msg = await message.channel.send('Loading please wait...');

		const player = client.music.players.get(message.guild.id);
		if (!player) return message.channel.send("No song/s currently playing within this guild.");

		const { channel } = message.member.voice;
        if (!channel || channel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel.")

		if (!args[0] || args[0].toLowerCase() == 'current') {
			if (player.trackRepeat === false) {
				await delay(1500);
				player.setTrackRepeat(true);

				const looped = new MessageEmbed()
					.setDescription(`\`🔁\` | **Song is loop:** \`Current\``)
					.setColor('#000001');

					msg.edit('', looped);
						console.log(chalk.magenta(`  [Command]: Loop used by ${message.author.tag} from ${message.guild.name}`));
			}
			else {
				await delay(1500);
				player.setTrackRepeat(false);

				const unlooped = new MessageEmbed()
					.setDescription(`\`🔁\` | **Song is unloop:** \`Current\``)
					.setColor('#000001');

					msg.edit('', unlooped);
						console.log(chalk.magenta(`  [Command]: Unloop used by ${message.author.tag} from ${message.guild.name}`));
			}
		}
		else if (args[0] == 'all') {
			if (player.queueRepeat === true) {
				await delay(1500);
				player.setQueueRepeat(false);

				const unloopall = new MessageEmbed()
					.setDescription(`\`🔁\` | **Song is unloop:** \`All\``)
					.setColor('#000001');

					msg.edit('', unloopall);
						console.log(chalk.magenta(`  [Command]: Unloopall used by ${message.author.tag} from ${message.guild.name}`));
			}
			else {
				await delay(1500);
				player.setQueueRepeat(true);

				const loopall = new MessageEmbed()
					.setDescription(`\`🔁\` | **Song is loop:** \`All\``)
					.setColor('#000001');

					msg.edit('', loopall);
						console.log(chalk.magenta(`  [Command]: Loopall used by ${message.author.tag} from ${message.guild.name}`));
			}
		}
	}
};