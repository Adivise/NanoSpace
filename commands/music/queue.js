const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const pagequeue = require('../../structures/NQueue');
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
		const player = client.manager.get(message.guild.id);
		if (!player) return message.channel.send("No song/s currently playing within this guild.");
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send("You need to be in a same/voice channel.")

		console.log(chalk.magenta(`[COMMAND] Queue used by ${message.author.tag} from ${message.guild.name}`));

		const song = player.queue.current;
		const qduration = `${formatDuration(player.queue.duration)}`;
        const thumbnail = `https://img.youtube.com/vi/${song.identifier}/hqdefault.jpg`;

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
                .setAuthor({ name: `Queue - ${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
                .setThumbnail(thumbnail)
				.setColor('#000001')
				.setDescription(`**Currently Playing**\n**1.** [${song.title}](${song.uri}) \`[${formatDuration(song.duration)}]\` • ${song.requester}\n\n**Rest of queue**:${str == '' ? '  Nothing' : '\n' + str}`)
				.setFooter({ text: `Page • ${i + 1}/${pagesNum} | ${player.queue.length} • Song | ${qduration} • Total duration`});

			pages.push(embed);
		}

		if (!args[0]) {
			if (pages.length == pagesNum && player.queue.length > 10) pagequeue(client, message, pages, ['⏮', '⏭'], 120000, player.queue.length, qduration);
			else return message.channel.send({ embeds: [pages[0]] });
		}
		else {
			if (isNaN(args[0])) return message.channel.send('Page must be a number.');
			if (args[0] > pagesNum) return message.channel.send(`There are only ${pagesNum} pages available.`);
			const pageNum = args[0] == 0 ? 1 : args[0] - 1;
			return message.channel.send({ embeds: [pages[pageNum]] });
		}
	}
};