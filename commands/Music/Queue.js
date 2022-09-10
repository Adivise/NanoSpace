const { EmbedBuilder } = require('discord.js');
const { NormalPage } = require('../../structures/PageQueue.js');
const formatDuration = require('../../structures/FormatDuration.js');

module.exports = { 
    config: {
        name: "queue",
        aliases: ["q"],
        description: "Displays what the current queue is.",
        accessableby: "Member",
        category: "Music",
    },
    run: async (client, message, args, user, language, prefix) => {
		const player = client.manager.get(message.guild.id);
		if (!player) return message.channel.send(`${client.i18n.get(language, "noplayer", "no_player")}`);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return message.channel.send(`${client.i18n.get(language, "noplayer", "no_voice")}`);

		const song = player.queue.current;
		const qduration = `${formatDuration(player.queue.duration)}`;
        const thumbnail = `https://img.youtube.com/vi/${song.identifier}/hqdefault.jpg`;

		let pagesNum = Math.ceil(player.queue.length / 10);
		if(pagesNum === 0) pagesNum = 1;

		const songStrings = [];
		for (let i = 0; i < player.queue.length; i++) {
			const song = player.queue[i];
			songStrings.push(
				`**${i + 1}.** [${song.title}](${song.uri}) \`[${formatDuration(song.duration)}]\` • ${song.requester}
				`);
		}

		const pages = [];
		for (let i = 0; i < pagesNum; i++) {
			const str = songStrings.slice(i * 10, i * 10 + 10).join('');

			const embed = new EmbedBuilder()
                .setAuthor({ name: `${client.i18n.get(language, "music", "queue_author", {
					guild: message.guild.name,
				})}`, iconURL: message.guild.iconURL({ dynamic: true }) })
                .setThumbnail(thumbnail)
				.setColor(client.color) //**Currently Playing:**\n**[${song.title}](${song.uri})** \`[${formatDuration(song.duration)}]\` • ${song.requester}\n\n**Rest of queue**:${str == '' ? '  Nothing' : '\n' + str}
				.setDescription(`${client.i18n.get(language, "music", "queue_description", {
					title: song.title,
					url: song.uri,
					duration: formatDuration(song.duration),
					request: song.requester,
					rest: str == '' ? '  Nothing' : '\n' + str,
				})}`) //Page • ${i + 1}/${pagesNum} | ${player.queue.length} • Song | ${qduration} • Total duration
				.setFooter({ text: `${client.i18n.get(language, "music", "queue_footer", {
					page: i + 1,
					pages: pagesNum,
					queue_lang: player.queue.length,
					duration: qduration,
				})}` });

			pages.push(embed);
		}

		if (!args[0]) {
			if (pages.length == pagesNum && player.queue.length > 10) NormalPage(client, message, pages, 60000, player.queue.length, qduration, language);
			else return message.channel.send({ embeds: [pages[0]] });
		}
		else {
			if (isNaN(args[0])) return message.channel.send(`${client.i18n.get(language, "music", "queue_notnumber")}`);
			if (args[0] > pagesNum) return message.channel.send(`${client.i18n.get(language, "music", "queue_page_notfound", {
				page: pagesNum,
			})}`);
			const pageNum = args[0] == 0 ? 1 : args[0] - 1;
			return message.channel.send({ embeds: [pages[pageNum]] });
		}
	}
};