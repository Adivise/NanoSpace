const formatDuration = require("../../structures/FormatDuration.js");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ytsr = require("youtube-sr").default;

module.exports = { 
    config: {
        name: "nowplaying",
        aliases: ["np", "now"],
        description: "Display the song currently playing.",
        accessableby: "Member",
        category: "Music",
    },

    run: async (client, message, args, user, language, prefix) => {
        const realtime = client.config.NP_REALTIME;
        const msg = await message.channel.send(`${client.i18n.get(language, "music", "np_loading")}`);
        const player = client.manager.get(message.guild.id);
        if (!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);

        const song = player.queue.current;
        const CurrentDuration = formatDuration(player.position);
        const TotalDuration = formatDuration(song.duration);
        const Thumbnail = `https://img.youtube.com/vi/${song.identifier}/maxresdefault.jpg`;
        const songInfo = await ytsr.searchOne(song.uri);
        const views = songInfo.views;
        const uploadat = songInfo.uploadedAt;
        const Part = Math.floor(player.position / song.duration * 30);
        const Emoji = player.playing ? "🔴 |" : "⏸ |";

        const embeded = new MessageEmbed()
            .setAuthor({ name: player.playing ? `${client.i18n.get(language, "music", "np_title")}` : `${client.i18n.get(language, "music", "np_title_pause")}`, iconURL: `${client.i18n.get(language, "music", "np_icon")}` })
            .setColor(client.color)
            .setDescription(`**[${song.title}](${song.uri})**`)
            .setThumbnail(Thumbnail)
            .addField(`${client.i18n.get(language, "music", "np_author")}`, `${song.author}`, true)
            .addField(`${client.i18n.get(language, "music", "np_request")}`, `${song.requester}`, true)
            .addField(`${client.i18n.get(language, "music", "np_volume")}`, `${player.volume}%`, true)
            .addField(`${client.i18n.get(language, "music", "np_view")}`, `${views}`, true)
            .addField(`${client.i18n.get(language, "music", "np_upload")}`, `${uploadat}`, true)
            .addField(`${client.i18n.get(language, "music", "np_download")}`, `**[Click Here](https://www.mp3fromlink.com/watch?v=${song.identifier})**`, true)
            .addField(`${client.i18n.get(language, "music", "np_current_duration", {
                current_duration: CurrentDuration,
                total_duration: TotalDuration
            })}`, `\`\`\`${Emoji} ${'─'.repeat(Part) + '🎶' + '─'.repeat(30 - Part)}\`\`\``)
            .setTimestamp();

        const row = new MessageActionRow()
            .addComponents(
              new MessageButton()
                .setCustomId("pause")
                .setEmoji("⏯")
                .setStyle("PRIMARY")
            )
            .addComponents(
              new MessageButton()
                .setCustomId("replay")
                .setEmoji("⬅")
                .setStyle("SUCCESS")
            )
            .addComponents(
              new MessageButton()
                .setCustomId("stop")
                .setEmoji("✖")
                .setStyle("DANGER")
            )
            .addComponents(
              new MessageButton()
                .setCustomId("skip")
                .setEmoji("➡")
                .setStyle("SUCCESS")
            )
            .addComponents(
              new MessageButton()
                .setCustomId("loop")
                .setEmoji("🔄")
                .setStyle("PRIMARY")
            )

        const NEmbed = await msg.edit({ content: " ", embeds: [embeded], components: [row] });
        var interval = null;

        if (realtime === 'true') {
        interval = setInterval(async () => {
            if (!player.playing) return;
            const CurrentDuration = formatDuration(player.position);
            const Part = Math.floor(player.position / song.duration * 30);
            const Emoji = player.playing ? "🔴 |" : "⏸ |";

            embeded.fields[6] = { name: `${client.i18n.get(language, "music", "np_current_duration", {
                current_duration: CurrentDuration,
                total_duration: TotalDuration
            })}`, value: `\`\`\`${Emoji} ${'─'.repeat(Part) + '🎶' + '─'.repeat(30 - Part)}\`\`\`` };

            if (NEmbed) NEmbed.edit({ content: " ", embeds: [embeded], components: [row] })
        }, 5000);
        } else if (realtime === 'false') {
            if (!player.playing) return;
            if (NEmbed) NEmbed.edit({ content: " ", embeds: [embeded], components: [row] });
        }

        const filter = (message) => {
            if(message.guild.me.voice.channel && message.guild.me.voice.channelId === message.member.voice.channelId) return true;
            else {
              message.reply({ content: `${client.i18n.get(language, "music", "np_invoice")}`, ephemeral: true });
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
            const uni = player.paused ? `${client.i18n.get(language, "music", "np_switch_pause")}` : `${client.i18n.get(language, "music", "np_switch_resume")}`;
      
            const embed = new MessageEmbed()
                .setDescription(`${client.i18n.get(language, "music", "np_pause_msg", {
                    pause: uni
                })}`)
                .setColor(client.color);
            
            embeded.setAuthor({ name: player.playing ? `${client.i18n.get(language, "music", "np_title")}` : `${client.i18n.get(language, "music", "np_title_pause")}`, iconURL: `${client.i18n.get(language, "music", "np_icon")}` })
            embeded.fields[6] = { name: `${client.i18n.get(language, "music", "np_current_duration", {
                current_duration: formatDuration(player.position),
                total_duration: TotalDuration
            })}`, value: `\`\`\`${player.playing ? "🔴 |" : "⏸ |"} ${'─'.repeat(Math.floor(player.position / song.duration * 30)) + '🎶' + '─'.repeat(30 - Math.floor(player.position / song.duration * 30))}\`\`\`` };

            if(NEmbed) await NEmbed.edit({ embeds: [embeded] });
            interaction.reply({ embeds: [embed], ephemeral: true });
            } else if(id === "replay") {
            if(!player) {
                collector.stop();
            }

            await player.seek(0);
          
            const embed = new MessageEmbed()
                .setDescription(`${client.i18n.get(language, "music", "np_replay_msg")}`)
                .setColor(client.color);;
      
            interaction.reply({ embeds: [embed], ephemeral: true });
            } else if(id === "stop") {
            if(!player) {
                collector.stop();
            }
      
            await player.stop();
            await player.destroy();
      
            const embed = new MessageEmbed()
                .setDescription(`${client.i18n.get(language, "music", "np_stop_msg")}`)
                .setColor(client.color);

            clearInterval(interval);
            if (NEmbed) await NEmbed.edit({ components: [] })
            interaction.reply({ embeds: [embed], ephemeral: true });
            } else if (id === "skip") {
            if(!player) {
                collector.stop();
            }
            await player.stop();
      
            const embed = new MessageEmbed()
                .setDescription(`${client.i18n.get(language, "music", "np_skip_msg")}`)
                .setColor(client.color);

            clearInterval(interval);
            if (NEmbed) await NEmbed.edit({ components: [] });
            interaction.reply({ embeds: [embed], ephemeral: true });
            } else if(id === "loop") {
            if(!player) {
                collector.stop();
            }
            await player.setTrackRepeat(!player.trackRepeat);
            const uni = player.trackRepeat ? `${client.i18n.get(language, "music", "np_switch_enable")}` : `${client.i18n.get(language, "music", "np_switch_disable")}`;
      
            const embed = new MessageEmbed()
                .setDescription(`${client.i18n.get(language, "music", "np_repeat_msg", {
                    loop: uni
                    })}`)
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