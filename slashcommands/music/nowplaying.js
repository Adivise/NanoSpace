const chalk = require('chalk');
const formatDuration = require("../../structures/formatduration.js");
const { MessageEmbed } = require("discord.js");
const ytsr = require("youtube-sr").default;

module.exports = { 
    name: "nowplaying",
    description: "Displays what the bot is currently playing.",
    botPerms: ["SEND_MESSAGES", "EMBED_LINKS", "CONNECT", "SPEAK"],

    run: async (interaction, client) => {
        await interaction.deferReply({ ephemeral: false });
        const msg = await interaction.editReply('**Loading please wait...**');

		const player = client.manager.get(interaction.guild.id);
		if (!player) return msg.edit("No song/s currently playing within this guild.");
        
        const song = player.queue.current;

        const CurrentDuration = formatDuration(player.position);
		const Duration = formatDuration(song.duration);
        const thumbnail = `https://img.youtube.com/vi/${song.identifier}/hqdefault.jpg`;
        const part = Math.floor((player.position / song.duration) * 30);
        const emoji = player.playing ? '🔴 |' : '⏸️ |';
        const songInfo = await ytsr.searchOne(song.uri);

        const views = songInfo.views;
        const uploadat = songInfo.uploadedAt;

        const embed = new MessageEmbed()
            .setAuthor({ name: player.playing ? 'Now Playing...' : 'Song Pause..', iconURL: "https://cdn.discordapp.com/emojis/741605543046807626.gif" })
            .setColor('#000001')
            .setDescription(`**[${song.title}](${song.uri})**`)
            .setThumbnail(thumbnail)
            .addField('Author:', `${song.author}`, true)
            .addField('Requester:', `${song.requester}`, true)
            .addField('Volume:', `${player.volume}%`, true)
            .addField('Views:', `${views}`, true)
            .addField('Upload At:', `${uploadat}`, true)
            .addField('Download:', `**[Click Here](https://www.mp3fromlink.com/watch?v=${song.identifier})**`, true)
			.addField(`Current Duration: \`[${CurrentDuration} / ${Duration}]\``, `\`\`\`${emoji} ${'─'.repeat(part) + '🎶' + '─'.repeat(30 - part)}\`\`\``)
            .setTimestamp();
            
            msg.edit({ content: " ", embeds: [embed] })
                console.log(chalk.magenta(`[SLASHCOMMAND] Nowplaying used by ${interaction.user.tag} from ${interaction.guild.name}`));
    }
}