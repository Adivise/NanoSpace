const { MessageEmbed, MessageActionRow, MessageButton, Interaction } = require("discord.js");
const formatduration = require('../../structures/formatduration');
    
module.exports = async (client, player, track, payload) => {
  
    const embed = new MessageEmbed()
      .setAuthor({ name: `Starting playing...`, iconURL: 'https://cdn.discordapp.com/emojis/741605543046807626.gif'})
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
    
    const row2 = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("volup")
          .setEmoji("🔊")
          .setStyle("SECONDARY")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("voldown")
          .setEmoji("🔉")
          .setStyle("SECONDARY")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("replay")
          .setEmoji("🔂")
          .setStyle("SECONDARY")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("queue")
          .setEmoji("📋")
          .setStyle("SECONDARY")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("clear")
          .setEmoji("📛")
          .setStyle("DANGER")
      )
   
    const nplaying = await client.channels.cache.get(player.textChannel).send({ embeds: [embed], components: [row, row2] });

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
      } else if(id === "volup") {
        if(!player) {
          collector.stop();
        }
        await player.setVolume(player.volume + 5);

        const embed = new MessageEmbed()
            .setDescription(`\`🔊\` **Change volume to:** \`${player.volume}%\``)
            .setColor('#000001');

        message.reply({ embeds: [embed], ephemeral: true });
      }
      else if(id === "voldown") {
        if(!player) {
          collector.stop();
        }
        await player.setVolume(player.volume - 5);

        const embed = new MessageEmbed()
            .setDescription(`\`🔉\` **Change volume to:** \`${player.volume}%\``)
            .setColor('#000001');

        message.reply({ embeds: [embed], ephemeral: true });
      }
      else if(id === "replay") {
        if(!player) {
          collector.stop();
        }
        await player.seek(0);

        const embed = new MessageEmbed()
            .setDescription("\`⏮\` | **Song has been:** `Replay`")
            .setColor('#000001');

        message.reply({ embeds: [embed], ephemeral: true });
      }
      else if(id === "queue") {
        if(!player) {
          collector.stop();
        }
        const song = player.queue.current;
        const qduration = `${formatduration(player.queue.duration)}`;
        const thumbnail = `https://img.youtube.com/vi/${song.identifier}/hqdefault.jpg`;
    
        let pagesNum = Math.ceil(player.queue.length / 10);
        if(pagesNum === 0) pagesNum = 1;
    
        const songStrings = [];
        for (let i = 1; i < player.queue.length; i++) {
          const song = player.queue[i];
          songStrings.push(
            `**${i + 1}.** [${song.title}](${song.uri}) \`[${formatduration(song.duration)}]\` • ${song.requester}
            `);
        }

        const pages = [];
        for (let i = 0; i < pagesNum; i++) {
          const str = songStrings.slice(i * 10, i * 10 + 10).join('');
    
          const embed = new MessageEmbed()
            .setAuthor({ name: `Queue - ${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setThumbnail(thumbnail)
            .setColor('#000001')
            .setDescription(`**Currently Playing**\n**1.** [${song.title}](${song.uri}) \`[${formatduration(song.duration)}]\` • ${song.requester}\n\n**Rest of queue**:${str == '' ? '  Nothing' : '\n' + str}`)
            .setFooter({ text: `Page • ${i + 1}/${pagesNum} | ${player.queue.length} • Song | ${qduration} • Total duration`});
    
          pages.push(embed);
        }
        message.reply({ embeds: [pages[0]], ephemeral: true });
      }
      else if(id === "clear") {
        if(!player) {
          collector.stop();
        }
        await player.queue.clear();

        const embed = new MessageEmbed()
            .setDescription("\`📛\` | **Queue has been:** `Cleared`")
            .setColor('#000001');

        message.reply({ embeds: [embed], ephemeral: true });
      }
    });
}
