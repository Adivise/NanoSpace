const { EmbedBuilder } = require("discord.js");
const formatduration = require('../../structures/FormatDuration.js');
    
module.exports = async (client, player, track, payload) => {
      const embed = new EmbedBuilder()
        .setAuthor({ name: `Starting playing...`, iconURL: `https://cdn.discordapp.com/emojis/741605543046807626.gif` })
        .setDescription(`**[${track.title}](${track.uri})**`)
        .setColor(client.color)
        .setThumbnail(`https://img.youtube.com/vi/${track.identifier}/hqdefault.jpg`)
        .addFields({ name: `Author:`, value: `${track.author}`, inline: true })
        .addFields({ name: `Requester:`, value: `${track.requester}`, inline: true })
        .addFields({ name: `Volume:`, value: `${player.volume}%`, inline: true })
        .addFields({ name: `Queue Length:`, value: `${player.queue.length}`, inline: true })
        .addFields({ name: `Duration:`, value: `${formatduration(track.duration, true)}`, inline: true })
        .addFields({ name: `Total Duration:`, value: `${formatduration(player.queue.duration)}`, inline: true })
        .addFields({ name: `Current Duration: [0:00 / ${formatduration(track.duration, true)}]`, value: `\`\`\`🔴 | 🎶──────────────────────────────\`\`\``, inline: true })
        .setTimestamp();
     
    client.channels.cache.get(player.textChannel).send({ embeds: [embed] });
}
