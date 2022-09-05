const formatDuration = require("../../structures/FormatDuration.js");
const { EmbedBuilder } = require("discord.js");

module.exports = { 
    config: {
        name: "nowplaying",
        aliases: ["np", "now"],
        description: "Display the song currently playing.",
        accessableby: "Member",
        category: "Music",
    },

    run: async (client, message, args) => {
        const msg = await message.channel.send(`Loading please wait....`);

        const player = client.manager.get(message.guild.id);
        if (!player) return msg.edit(`No playing in this guild!`);

        const song = player.queue.current;
        const CurrentDuration = formatDuration(player.position);
        const TotalDuration = formatDuration(song.duration);
        const Thumbnail = `https://img.youtube.com/vi/${song.identifier}/maxresdefault.jpg`;

        const Part = Math.floor(player.position / song.duration * 30);
        const Emoji = player.playing ? "🔴 |" : "⏸ |";

        const embeded = new EmbedBuilder()
            .setAuthor({ name: player.playing ? `Now playing...` : `Song pause...`, iconURL: `https://cdn.discordapp.com/emojis/741605543046807626.gif` })
            .setColor(client.color)
            .setDescription(`**[${song.title}](${song.uri})**`)
            .setThumbnail(Thumbnail)
            .addFields({ name: `Author:`, value: `${song.author}`, inline: true })
            .addFields({ name: `Requester:`, value: `${song.requester}`, inline: true })
            .addFields({ name: `Volume:`, value: `${player.volume}%`, inline: true })
            .addFields({ name: `Queue Length:`, value: `${player.queue.length}`, inline: true })
            .addFields({ name: `Total Duration:`, value: `${formatDuration(player.queue.duration)}`, inline: true })
            .addFields({ name: `Download:`, value: `**[Click Here](https://www.mp3fromlink.com/watch?v=${song.identifier})**`, inline: true })
            .addFields({ name: `Current Duration: \`[${CurrentDuration} / ${TotalDuration}]\``, value: `\`\`\`${Emoji} ${'─'.repeat(Part) + '🎶' + '─'.repeat(30 - Part)}\`\`\``, inline: false })
            .setTimestamp();

        await msg.edit({ content: " ", embeds: [embeded] });
    }
}