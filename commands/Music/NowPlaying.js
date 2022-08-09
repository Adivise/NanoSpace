const formatDuration = require("../../structures/FormatDuration.js");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = { 
    config: {
        name: "nowplaying",
        aliases: ["np", "now"],
        description: "Display the song currently playing.",
        accessableby: "Member",
        category: "Music",
    },

    run: async (client, message, args, user) => {
        const realtime = client.config.NP_REALTIME;
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

        const row = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
                .setCustomId("pause")
                .setEmoji("⏯")
                .setStyle(ButtonStyle.Primary)
            )
            .addComponents(
              new ButtonBuilder()
                .setCustomId("replay")
                .setEmoji("⬅")
                .setStyle(ButtonStyle.Success)
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
                .setStyle(ButtonStyle.Success)
            )
            .addComponents(
              new ButtonBuilder()
                .setCustomId("loop")
                .setEmoji("🔄")
                .setStyle(ButtonStyle.Primary)
            )

        const NEmbed = await msg.edit({ content: " ", embeds: [embeded], components: [row] });
        var interval = null;

        if (realtime === 'true') {
        interval = setInterval(async () => {
            if (!player.playing) return;
            const CurrentDuration = formatDuration(player.position);
            const Part = Math.floor(player.position / song.duration * 30);
            const Emoji = player.playing ? "🔴 |" : "⏸ |";

            embeded.fields[6] = { name: `Current Duration: \`[${CurrentDuration} / ${TotalDuration}]\``, value: `\`\`\`${Emoji} ${'─'.repeat(Part) + '🎶' + '─'.repeat(30 - Part)}\`\`\`` };

            if (NEmbed) NEmbed.edit({ content: " ", embeds: [embeded], components: [row] })
        }, 5000);
        } else if (realtime === 'false') {
            if (!player.playing) return;
            if (NEmbed) NEmbed.edit({ content: " ", embeds: [embeded], components: [row] });
        }

        const filter = (message) => {
            if(message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId === message.member.voice.channelId) return true;
            else {
              message.reply({ content: `You need to be in a same/voice channel to use this button.`, ephemeral: true });
            }
          };
        const collector = msg.createMessageComponentCollector({ filter, time: song.duration });
        
        collector.on('collect', async (interaction) => {
            const id = interaction.customId;

            if(id === "pause") {
            if(!player) {
                collector.stop();
            }
            await player.pause(!player.paused);
            const uni = player.paused ? `Paused` : `Resumed`;
      
            const embed = new EmbedBuilder()
                .setDescription(`\`⏯\` | *Song has been:* \`${uni}\``)
                .setColor(client.color);
            
            embeded.setAuthor({ name: player.playing ? `Now playing...` : `Song pause...`, iconURL: `https://cdn.discordapp.com/emojis/741605543046807626.gif` })
            embeded.fields[6] = { name: `Current Duration: \`[${CurrentDuration} / ${TotalDuration}]\``, value: `\`\`\`${player.playing ? "🔴 |" : "⏸ |"} ${'─'.repeat(Math.floor(player.position / song.duration * 30)) + '🎶' + '─'.repeat(30 - Math.floor(player.position / song.duration * 30))}\`\`\`` };

            if(NEmbed) await NEmbed.edit({ embeds: [embeded] });
            interaction.reply({ embeds: [embed], ephemeral: true });
            } else if(id === "replay") {
            if(!player) {
                collector.stop();
            }

            await player.seek(0);
          
            const embed = new EmbedBuilder()
                .setDescription("`🔁` | *Song has been:* `Replayed`")
                .setColor(client.color);;
      
            interaction.reply({ embeds: [embed], ephemeral: true });
            } else if(id === "stop") {
            if(!player) {
                collector.stop();
            }
      
            await player.stop();
            await player.destroy();
      
            const embed = new EmbedBuilder()
                .setDescription("`🚫` | *Song has been:* `Stopped`")
                .setColor(client.color);

            clearInterval(interval);
            if (NEmbed) await NEmbed.edit({ components: [] })
            interaction.reply({ embeds: [embed], ephemeral: true });
            } else if (id === "skip") {
            if(!player) {
                collector.stop();
            }
            await player.stop();
      
            const embed = new EmbedBuilder()
                .setDescription("`⏭` | *Song has been:* `Skipped`")
                .setColor(client.color);

            clearInterval(interval);
            if (NEmbed) await NEmbed.edit({ components: [] });
            interaction.reply({ embeds: [embed], ephemeral: true });
            } else if(id === "loop") {
            if(!player) {
                collector.stop();
            }
            await player.setTrackRepeat(!player.trackRepeat);
            const uni = player.trackRepeat ? `Enabled` : `Disabled`;
      
            const embed = new EmbedBuilder()
                .setDescription(`\`🔁\` | *Loop has been:* \`${uni}\``)
                .setColor(client.color);
      
            interaction.reply({ embeds: [embed], ephemeral: true });
        }
        });

        collector.on('end', async (collected, reason) => {
            if(reason === "time") {
                if (NEmbed) await NEmbed.edit({ components: [] });
                clearInterval(interval);
            }
        });
    }
}