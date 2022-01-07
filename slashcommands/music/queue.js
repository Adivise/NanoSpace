const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const pagequeue = require('../../structures/SQueue');
const formatDuration = require('../../structures/formatduration');

module.exports = { 
    name: "queue",
    description: "Show the queue of songs.",
    botPerms: ["SEND_MESSAGES", "EMBED_LINKS", "CONNECT", "SPEAK"],
    options: [
        {
            name: "page",
            description: "Page number to show.",
            type: 4,
        }
    ],
    run: async (interaction, client) => {
        await interaction.deferReply({ ephemeral: false });
        const value = interaction.options.getInteger("page");
		const player = client.manager.get(interaction.guild.id);
		if (!player) return interaction.editReply("No song/s currently playing within this guild.");
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return interaction.editReply("You need to be in a same/voice channel.")

		console.log(chalk.magenta(`[SLASHCOMMAND] Queue used by ${interaction.user.tag} from ${interaction.guild.name}`));

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
                .setAuthor({ name: `Queue - ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                .setThumbnail(thumbnail)
				.setColor('#000001')
				.setDescription(`**Currently Playing**\n**1.** [${song.title}](${song.uri}) \`[${formatDuration(song.duration)}]\` • ${song.requester}\n\n**Rest of queue**:${str == '' ? '  Nothing' : '\n' + str}`)
				.setFooter({ text: `Page • ${i + 1}/${pagesNum} | ${player.queue.length} • Song | ${qduration} • Total duration`});

			pages.push(embed);
		}

		if (!value) {
			if (pages.length == pagesNum && player.queue.length > 10) pagequeue(client, interaction, pages, ['⏮', '⏭'], 120000, player.queue.length, qduration);
			else return interaction.editReply({ embeds: [pages[0]] });
		}
		else {
			if (isNaN(value)) return interaction.editReply('Page must be a number.');
			if (value > pagesNum) return interaction.editReply(`There are only ${pagesNum} pages available.`);
			const pageNum = value == 0 ? 1 : value - 1;
			return interaction.editReply({ embeds: [pages[pageNum]] });
		}
	}
};