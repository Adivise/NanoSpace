const chalk = require('chalk');
const { MessageEmbed, MessageButton, MessageActionRow, Permissions } = require("discord.js");
const { convertTime } = require("../../structures/convert");

module.exports = { 
    config: {
        name: "search",
        description: "Play a song/playlist or search for a song from youtube",
        usage: "<results>",
        category: "music",
        accessableby: "Member",
        aliases: []
    },
    run: async (client, message, args) => {
        console.log(chalk.magenta(`[COMMAND] Search used by ${message.author.tag} from ${message.guild.name}`));
        const msg = await message.channel.send('Loading please wait...')
        const { channel } = message.member.voice;
        
		if (!channel) return message.channel.send("You need to be in a voice channel to use command.");
		if (!channel.permissionsFor(message.guild.me).has(Permissions.FLAGS.CONNECT)) return message.channel.send("I don't have permission to join your voice channel.");
		if (!channel.permissionsFor(message.guild.me).has(Permissions.FLAGS.SPEAK)) return message.channel.send("I don't have permission to speak in your voice channel.");

        if (!args[0]) return msg.edit("Please provide a song name or link to search.");

        const player = client.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            selfDeafen: true,
        });

        const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId("one")
            .setEmoji("1️⃣")
            .setStyle("SECONDARY")
        )
        .addComponents(
          new MessageButton()
            .setCustomId("two")
            .setEmoji("2️⃣")
            .setStyle("SECONDARY")
        )
        .addComponents(
          new MessageButton()
            .setCustomId("three")
            .setEmoji("3️⃣")
            .setStyle("SECONDARY")
        )
        .addComponents(
          new MessageButton()
            .setCustomId("four")
            .setEmoji("4️⃣")
            .setStyle("SECONDARY")
        )
        .addComponents(
          new MessageButton()
            .setCustomId("five")
            .setEmoji("5️⃣")
            .setStyle("SECONDARY")
        )

        const search = args.join(" ");

        const state = player.state;
        if (state != "CONNECTED") await player.connect();
        const res = await client.manager.search(search, message.author);
        if(res.loadType != "NO_MATCHES") {
            if(res.loadType == "TRACK_LOADED") {
                player.queue.add(res.tracks[0]);
                const embed = new MessageEmbed()
                    .setDescription(`**Queued • [${res.tracks[0].title}](${res.tracks[0].uri})** \`${convertTime(res.tracks[0].duration, true)}\` • ${res.tracks[0].requester}`)
                    .setColor('#000001')
                    msg.edit({ content: " ", embeds: [embed] });
                    if (!player.playing) player.play();
                }
                else if(res.loadType == "SEARCH_RESULT") {
                    let index = 1;
                    const results = res.tracks
                        .slice(0, 5)
                        .map(video => `**(${index++}.) [${video.title}](${video.uri})** \`${convertTime(video.duration)}\` Author: \`${video.author}\``)
                        .join("\n");
                    const playing = new MessageEmbed()
                        .setAuthor({ name: `Song Selection...`, iconURL: message.guild.iconURL({ dynamic: true }) })
                        .setColor('#000001')
                        .setDescription(results)
                        .setFooter({ text: `Please select a song in 30 seconds.`});
                    await msg.edit({ content: " ", embeds: [playing], components: [row] });

                    const collector = msg.createMessageComponentCollector({ filter: (interaction) => interaction.user.id === message.author.id ? true : false && interaction.deferUpdate(), max: 1, time: 30000 });

                    collector.on('collect', async (interaction) => {
                        if(!interaction.deferred) await interaction.deferUpdate();
                        if(!player && !collector.ended) return collector.stop();
                        const id = interaction.customId;

                        if(id === "one") {
                            player.queue.add(res.tracks[0]);
                            if(player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) await player.play();

                            const embed = new MessageEmbed()
                                .setDescription(`**Queued • [${res.tracks[0].title}](${res.tracks[0].uri})** \`${convertTime(res.tracks[0].duration, true)}\` • ${res.tracks[0].requester}`)
                                .setColor('#000001')
         
                            if(msg) await msg.edit({ embeds: [embed], components: [] });
                        } else if(id === "two") {
                            player.queue.add(res.tracks[1]);
                            if(player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) await player.play();

                            const embed = new MessageEmbed()
                                .setDescription(`**Queued • [${res.tracks[1].title}](${res.tracks[1].uri})** \`${convertTime(res.tracks[1].duration, true)}\` • ${res.tracks[1].requester}`)
                                .setColor('#000001')
        
                            if(msg) await msg.edit({ embeds: [embed], components: [] });
                        } else if(id === "three") {
                            player.queue.add(res.tracks[2]);
                            if(player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) await player.play();

                            const embed = new MessageEmbed()
                                .setDescription(`**Queued • [${res.tracks[2].title}](${res.tracks[2].uri})** \`${convertTime(res.tracks[2].duration, true)}\` • ${res.tracks[2].requester}`)
                                .setColor('#000001')
        
                            if(msg) await msg.edit({ embeds: [embed], components: [] });
                        } else if(id === "four") {
                            player.queue.add(res.tracks[3]);
                            if(player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) await player.play();

                            const embed = new MessageEmbed()
                                .setDescription(`**Queued • [${res.tracks[3].title}](${res.tracks[3].uri})** \`${convertTime(res.tracks[3].duration, true)}\` • ${res.tracks[3].requester}`)
                                .setColor('#000001')
        
                            if(msg) await msg.edit({ embeds: [embed], components: [] });
                        } else if(id === "five") {
                            player.queue.add(res.tracks[4]);
                            if(player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) await player.play();

                            const embed = new MessageEmbed()
                                .setDescription(`**Queued • [${res.tracks[4].title}](${res.tracks[4].uri})** \`${convertTime(res.tracks[4].duration, true)}\` • ${res.tracks[4].requester}`)
                                .setColor('#000001')
        
                            if(msg) await msg.edit({ embeds: [embed], components: [] });
                        }
                    });

                    collector.on('end', async (collected, reason) => {
                        if(reason === "time") {
                            msg.edit({ content: "No response", embeds: [], components: [] });
                        }
                    });

                }
                else if(res.loadType == "PLAYLIST_LOADED") {
                    player.queue.add(res.tracks)
                    const playlist = new MessageEmbed()
                        .setDescription(`**Queued** • [${res.playlist.name}](${search}) \`${convertTime(res.playlist.duration)}\` (${res.tracks.length} tracks) • ${res.tracks[0].requester}`)
                        .setColor('#000001')
                    msg.edit({ content: " ", embeds: [playlist] });
                        if(!player.playing) player.play()
                    }
                    else if(res.loadType == "LOAD_FAILED") {
                        return msg.edit("Error loading track.");
                    }
                }
                else {
                    return msg.edit("Error loading track.");
                }
            }
        }