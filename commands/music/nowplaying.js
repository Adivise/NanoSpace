const formatDuration = require("../../structures/formatduration.js");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ytsr = require("youtube-sr").default;
const chalk = require("chalk");

module.exports = { 
    config: {
        name: "nowplaying",
        aliases: ["np", "now"],
        description: "Displays what the current song every 5 seconds.",
        accessableby: "Member",
        category: "music",
    },

    run: async (client, message, args) => {
        console.log(chalk.magenta(`[COMMAND] NowPlaying used by ${message.author.tag} from ${message.guild.name}`));
        const realtime = client.config.NP_REALTIME;
        const msg = await message.channel.send("Loading please wait...");
        const player = client.manager.get(message.guild.id);
        if (!player) return message.channel.send("No song/s currently playing within this guild.");

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
            .setAuthor({ name: player.playing ? 'Now Playing...' : 'Song Pause..', iconURL: "https://cdn.discordapp.com/emojis/741605543046807626.gif" })
            .setColor('#000001')
            .setDescription(`**[${song.title}](${song.uri})**`)
            .setThumbnail(Thumbnail)
            .addField('Author:', `${song.author}`, true)
            .addField('Requester:', `${song.requester}`, true)
            .addField('Volume:', `${player.volume}%`, true)
            .addField('Views:', `${views}`, true)
            .addField('Upload At:', `${uploadat}`, true)
            .addField('Download:', `**[Click Here](https://www.mp3fromlink.com/watch?v=${song.identifier})**`, true)
            .addField(`Current Duration: \`[${CurrentDuration} / ${TotalDuration}]\``, `\`\`\`${Emoji} ${'─'.repeat(Part) + '🎶' + '─'.repeat(30 - Part)}\`\`\``)
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

            embeded.fields[6] = { name: `Current Duration: \`[${CurrentDuration} / ${TotalDuration}]\``, value: `\`\`\`${Emoji} ${'─'.repeat(Part) + '🎶' + '─'.repeat(30 - Part)}\`\`\`` };

            if (NEmbed) NEmbed.edit({ content: " ", embeds: [embeded], components: [row] })
        }, 5000);
        } else if (realtime === 'false') {
            if (!player.playing) return;
            if (NEmbed) NEmbed.edit({ content: " ", embeds: [embeded], components: [row] });
        }

        const filter = (message) => {
            if(message.guild.me.voice.channel && message.guild.me.voice.channelId === message.member.voice.channelId) return true;
            else {
              message.reply({ content: "You need to be in a same/voice channel.", ephemeral: true });
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
            const uni = player.paused ? "Paused" : "Resumed";
      
            const embed = new MessageEmbed()
                .setDescription(`\`⏯\` **Song has been:** \`${uni}\``)
                .setColor('#000001');
            
            embeded.setAuthor({ name: player.playing ? 'Now Playing...' : 'Song Pause..', iconURL: "https://cdn.discordapp.com/emojis/741605543046807626.gif" });
            embeded.fields[6] = { name: `Current Duration: \`[${formatDuration(player.position)} / ${formatDuration(song.duration)}]\``, value: `\`\`\`${player.playing ? "🔴 |" : "⏸ |"} ${'─'.repeat(Math.floor(player.position / song.duration * 30)) + '🎶' + '─'.repeat(30 - Math.floor(player.position / song.duration * 30))}\`\`\`` };

            if(NEmbed) await NEmbed.edit({ embeds: [embeded] });
            interaction.reply({ embeds: [embed], ephemeral: true });
            } else if(id === "replay") {
            if(!player) {
                collector.stop();
            }

            await player.seek(0);
          
            const embed = new MessageEmbed()
                .setDescription("\`⏮\` | **Song has been:** `Replay`")
                .setColor('#000001');;
      
            interaction.reply({ embeds: [embed], ephemeral: true });
            } else if(id === "stop") {
            if(!player) {
                collector.stop();
            }
      
            await player.stop();
            await player.destroy();
      
            const embed = new MessageEmbed()
                .setDescription(`\`🚫\` | **Song has been:** | \`Stopped\``)
                .setColor('#000001');

            clearInterval(interval);
            if (NEmbed) await NEmbed.edit({ components: [] })
            interaction.reply({ embeds: [embed], ephemeral: true });
            } else if (id === "skip") {
            if(!player) {
                collector.stop();
            }
            await player.stop();
      
            const embed = new MessageEmbed()
                .setDescription("\`⏭\` | **Song has been:** `Skipped`")
                .setColor('#000001');

            clearInterval(interval);
            if (NEmbed) await NEmbed.edit({ components: [] });
            interaction.reply({ embeds: [embed], ephemeral: true });
            } else if(id === "loop") {
            if(!player) {
                collector.stop();
            }
            await player.setTrackRepeat(!player.trackRepeat);
            const uni = player.trackRepeat ? "Enabled" : "Disabled";
      
            const embed = new MessageEmbed()
                .setDescription(`\`🔁\` **Loop has been:** \`${uni}\``)
                .setColor('#000001');
      
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