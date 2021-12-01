const { MessageEmbed } = require("discord.js");
const formatduration = require('../../structures/formatduration');
    
module.exports = async (client, player, track, payload) => {
  
    const embed = new MessageEmbed()
      .setAuthor(`Starting playing...`, 'https://cdn.discordapp.com/emojis/741605543046807626.gif')
      .setDescription(`**[${track.title}](${track.uri})**`)
      .setColor('#000001')
      .setThumbnail(`https://img.youtube.com/vi/${track.identifier}/hqdefault.jpg`)
      .addField('Author:', `${track.author}`, true)
      .addField('Requester:', `${track.requester}`, true)
      .addField('Current Volume:', `${player.volume}%`, true)
      .addField('Queue Length:', `${player.queue.length}`, true)
      .addField('Duration:', `${formatduration(track.duration, true)}`, true)
      .addField('Total Duration:', `${formatduration(player.queue.duration)}`, true)
      .addField(`Current Duration: \`[0:00 / ${formatduration(track.duration, true)}]\``, `\`\`\`🔴 | 🎶──────────────────────────────\`\`\``)
      .setTimestamp();
   
    await client.channels.cache.get(player.textChannel).send({ embeds: [embed] });
}
