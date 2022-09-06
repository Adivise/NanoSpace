const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const formatduration = require('../../structures/FormatDuration.js');
    
module.exports = async (client, player, track, payload) => {
      const embeded = new EmbedBuilder()
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
      
      const row = new  ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId("pause")
            .setEmoji("⏯")
            .setStyle(ButtonStyle.Success)
        )
        .addComponents(
          new ButtonBuilder()
            .setCustomId("replay")
            .setEmoji("⬅")
            .setStyle(ButtonStyle.Primary)
        )
        .addComponents(
          new ButtonBuilder()
            .setCustomId("stop")
            .setEmoji("✖")
            .setStyle(ButtonStyle.Danger)
        )
        .addComponents(
          new ButtonBuilder()
            .setCustomId("skip")
            .setEmoji("➡")
            .setStyle(ButtonStyle.Primary)
        )
        .addComponents(
          new ButtonBuilder()
            .setCustomId("loop")
            .setEmoji("🔄")
            .setStyle(ButtonStyle.Success)
        )
      
      const row2 = new  ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId("shuffle")
            .setEmoji("🔀")
            .setStyle(ButtonStyle.Success)
        )
        .addComponents(
          new ButtonBuilder()
            .setCustomId("voldown")
            .setEmoji("🔉")
            .setStyle(ButtonStyle.Primary)
        )
        .addComponents(
          new ButtonBuilder()
            .setCustomId("clear")
            .setEmoji("🗑")
            .setStyle(ButtonStyle.Danger)
        )
        .addComponents(
          new ButtonBuilder()
            .setCustomId("volup")
            .setEmoji("🔊")
            .setStyle(ButtonStyle.Primary)
        )
        .addComponents(
          new ButtonBuilder()
            .setCustomId("queue")
            .setEmoji("📋")
            .setStyle(ButtonStyle.Success)
        )
     
      const nplaying = await client.channels.cache.get(player.textChannel).send({ embeds: [embeded], components: [row, row2] });

      const filter = (message) => {
        if(message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId === message.member.voice.channelId) return true;
        else {
          message.reply({ content: `You need to be in a same/voice channel to use this button.`, ephemeral: true });
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
          const uni = player.paused ? `Paused` : `Resumed`;

          const embed = new EmbedBuilder()
              .setDescription(`\`⏯\` | *Song has been:* \`${uni}\``)
              .setColor(client.color);

          message.reply({ embeds: [embed], ephemeral: true });
        } else if (id === "skip") {
          if(!player) {
            collector.stop();
          }
          await player.stop();

          const embed = new EmbedBuilder()
              .setDescription("`⏭` | *Song has been:* `Skipped`")
              .setColor(client.color);

          await nplaying.edit({ embeds: [embeded], components: [] });
          message.reply({ embeds: [embed], ephemeral: true });
        } else if(id === "stop") {
          if(!player) {
            collector.stop();
          }

          await player.stop();
          await player.destroy();

          const embed = new EmbedBuilder()
              .setDescription("`🚫` | *Song has been:* `Stopped`")
              .setColor(client.color);
          
          await nplaying.edit({ embeds: [embeded], components: [] });
          message.reply({ embeds: [embed], ephemeral: true });
        } else if(id === "shuffle") {
          if(!player) {
            collector.stop();
          }
          await player.queue.shuffle();

          const embed = new EmbedBuilder()
              .setDescription("`🔀` | *Queue has been:* `Shuffled`")
              .setColor(client.color);

          message.reply({ embeds: [embed], ephemeral: true });
        } else if(id === "loop") {
          if(!player) {
            collector.stop();
          }
          await player.setTrackRepeat(!player.trackRepeat);
          const uni = player.trackRepeat ? `Enabled` : `Disabled`;

          const embed = new EmbedBuilder()
              .setDescription(`\`🔁\` | *Loop has been:* \`${uni}\``)
              .setColor(client.color);

          message.reply({ embeds: [embed], ephemeral: true });
        } else if(id === "volup") {
          if(!player) {
            collector.stop();
          }
          await player.setVolume(player.volume + 5);

          const embed = new EmbedBuilder()
              .setDescription(`\`🔊\` | *Change volume to:* \`${player.volume}%\``)
              .setColor(client.color);

          message.reply({ embeds: [embed], ephemeral: true });
        }
        else if(id === "voldown") {
          if(!player) {
            collector.stop();
          }
          await player.setVolume(player.volume - 5);

          const embed = new EmbedBuilder()
              .setDescription(`\`🔉\` | *Change volume to:* \`${player.volume}%\``)
              .setColor(client.color);

          message.reply({ embeds: [embed], ephemeral: true });
        }
        else if(id === "replay") {
          if(!player) {
            collector.stop();
          }
          await player.seek(0);

          const embed = new EmbedBuilder()
              .setDescription(`\`🔁\` | *Song has been:* \`Replayed\``)
              .setColor(client.color);

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
          for (let i = 0; i < player.queue.length; i++) {
            const song = player.queue[i];
            songStrings.push(
              `**${i + 1}.** [${song.title}](${song.uri}) \`[${formatduration(song.duration)}]\` • ${song.requester}
              `);
          }

          const pages = [];
          for (let i = 0; i < pagesNum; i++) {
            const str = songStrings.slice(i * 10, i * 10 + 10).join('');
      
            const embed = new EmbedBuilder()
              .setAuthor({ name: `Queue - ${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
              .setThumbnail(thumbnail)
              .setColor(client.color)
              .setDescription(`*Currently Playing*\n*[${song.title}](${song.uri})* \`[${formatduration(song.duration)}]\` • ${song.requester}\n\n*Rest of queue*:${str == '' ? '  Nothing' : '\n' + str}`)
              .setFooter({ text: `Page • ${i + 1}/${pagesNum} | ${player.queue.language} • Song | ${qduration} • Total Duration` });
      
            pages.push(embed);
          }
          message.reply({ embeds: [pages[0]], ephemeral: true });
        }
        else if(id === "clear") {
          if(!player) {
            collector.stop();
          }
          await player.queue.clear();

          const embed = new EmbedBuilder()
              .setDescription("`📛` | *Queue has been:* `Cleared`")
              .setColor(client.color);

          message.reply({ embeds: [embed], ephemeral: true });
        }
      });
      collector.on('end', async (collected, reason) => {
        if(reason === "time") {
          nplaying.edit({ embeds: [embeded], components: [] })
      }
    });
}
