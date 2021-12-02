const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
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
    
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("pause")
          .setEmoji("⏯")
          .setStyle("SECONDARY")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("skip")
          .setEmoji("⏭")
          .setStyle("SECONDARY")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("shuffle")
          .setEmoji("🔀")
          .setStyle("SECONDARY")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("loop")
          .setEmoji("🔁")
          .setStyle("SECONDARY")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("stop")
          .setEmoji("⏹")
          .setStyle("DANGER")
      )
   
    const nplaying = await client.channels.cache.get(player.textChannel).send({ embeds: [embed], components: [row] });

    const filter = (message) => {
      if(message.guild.me.voice.channel && message.guild.me.voice.channelId === message.member.voice.channelId) return true;
      else {
        message.reply({ content: "You need to be in a same/voice channel.", ephemeral: true });
      }
    };
    const collector = nplaying.createMessageComponentCollector({ filter, time: track.duration });

    collector.on('collect', async (message) => {
      const id = message.customId;
      if(id === "pause") {
      if(!player) {
          collector.stop();
      }
        await player.pause(!player.paused);
        const uni = player.paused ? "Paused" : "Resumed";

        const embed = new MessageEmbed()
            .setDescription(`\`⏯\` **Song has been:** \`${uni}\``)
            .setColor('#000001');

        message.reply({ embeds: [embed], ephemeral: true });
      } else if (id === "skip") {
        if(!player) {
          collector.stop();
        }
        await player.stop();

        const embed = new MessageEmbed()
            .setDescription("\`⏭\` | **Song has been:** `Skipped`")
            .setColor('#000001');

        message.reply({ embeds: [embed], ephemeral: true });
      } else if(id === "stop") {
        if(!player) {
          collector.stop();
        }
        await player.stop();
        await player.destroy();

        const embed = new MessageEmbed()
            .setDescription(`\`🚫\` | **Song has been:** | \`Stopped\``)
            .setColor('#000001');

        message.reply({ embeds: [embed], ephemeral: true });
      } else if(id === "shuffle") {
        if(!player) {
          collector.stop();
        }
        await player.queue.shuffle();

        const embed = new MessageEmbed()
            .setDescription(`\`🔀\` **Queue has been:** \`Shuffle\``)
            .setColor('#000001');

        message.reply({ embeds: [embed], ephemeral: true });
      } else if(id === "loop") {
        if(!player) {
          collector.stop();
        }
        await player.setTrackRepeat(!player.trackRepeat);
        const uni = player.trackRepeat ? "Enabled" : "Disabled";

        const embed = new MessageEmbed()
            .setDescription(`\`🔁\` **Loop has been:** \`${uni}\``)
            .setColor('#000001');

        message.reply({ embeds: [embed], ephemeral: true });
      }
    });
}
