const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const pagequeue = require('../../structures/pagequeue');
const { Utils } = require('erela.js');
const formatDuration = require('../../structures/formatduration');

module.exports = { 
    config: {
        name: "queue",
        aliases: ["q", "qq"],
        description: "Displays what the current queue is.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const player = client.music.players.get(message.guild.id);
		if(!player || !player.queue[0]) return message.channel.send("No song currently playing in this guild.");
			console.log(chalk.magenta(`  [Command]: Queue used by ${message.author.tag} from ${message.guild.name}`));

		const cduration = formatDuration(player.queue[0].duration);
        const qduration = Utils.formatTime(player.queue.reduce((acc, cur) => ({ duration: acc.duration + cur.duration })).duration, true);
        const thumbnail = `https://img.youtube.com/vi/${player.queue[0].identifier}/hqdefault.jpg`;

		let pagesNum = Math.ceil(player.queue.length / 10);
		if(pagesNum === 0) pagesNum = 1;

		const songStrings = [];
		for (let i = 1; i < player.queue.length; i++) {
			const song = player.queue[i];
			songStrings.push(
				`**${i + 1}.** [${song.title}](${song.uri}) \`[${formatDuration(song.duration)}]\` • ${song.requester}
				`);
		}

		const pages = [];
		for (let i = 0; i < pagesNum; i++) {
			const str = songStrings.slice(i * 10, i * 10 + 10).join('');

			const embed = new MessageEmbed()
                .setAuthor(`Queue - ${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
                .setThumbnail(thumbnail)
				.setColor('#000001')
				.setDescription(`**Currently Playing**\n**1.** [${player.queue[0].title}](${player.queue[0].uri}) \`[${cduration}]\` • ${player.queue[0].requester}\n\n**Rest of queue**${str == '' ? '  Nothing' : '\n' + str }`)
				.setFooter(`Page • ${i + 1}/${pagesNum} | ${player.queue.length} • Song | ${qduration} • Total duration`);

			pages.push(embed);
		}

		if (!args[0]) {
			if (pages.length == pagesNum && player.queue.length > 10) pagequeue(client, message, pages, ['⏮', '⏭'], 120000, player.queue.length, qduration);
			else return message.channel.send(pages[0]);
		}
		else {
			if (isNaN(args[0])) return message.channel.send('Page must be a number.');
			if (args[0] > pagesNum) return message.channel.send(`There are only ${pagesNum} pages available.`);
			const pageNum = args[0] == 0 ? 1 : args[0] - 1;
			return message.channel.send(pages[pageNum]);
		}
	}
};