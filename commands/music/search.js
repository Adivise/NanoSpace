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
        if (!message.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return msg.edit({ embed: { description: "I don't have perm `CONNECT` or `SPEAK` to execute command!", color: "#000001" } });
        if (!message.guild.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return msg.edit({ embed : { description: `I don't have perm \`CONNECT\` or \`SPEAK\` in ${channel.name} to join voice!`, color: "#000001" } });
        if (!channel) return msg.edit("You need to be in a voice channel to play music.");
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
        client.manager.search(search, message.author).then(async res => {
            switch (res.loadType) {
                case "TRACK_LOADED":
                    player.queue.add(res.tracks[0]);

                const embed = new MessageEmbed()
                    .setDescription(`**Queued • [${res.tracks[0].title}](${res.tracks[0].uri})** \`${convertTime(res.tracks[0].duration, true)}\` • ${res.tracks[0].requester}`)
                    .setColor('#000001')

                    msg.edit({ content: " ", embeds: [embed] });
                        console.log(chalk.magenta(`[COMMAND] Search used by ${message.author.tag} from ${message.guild.name}`));
                    if (!player.playing) player.play()
                    break;
                
                case "SEARCH_RESULT":
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
                    break;

                case "PLAYLIST_LOADED":
                    let search = await player.search(args.join(" "), message.author);
                    player.queue.add(search.tracks)

                    const playlist = new MessageEmbed()
                        .setDescription(`**Queued** • [${search.playlist.name}](${args.join(" ")}) \`${convertTime(search.playlist.duration)}\` (${search.tracks.length} tracks) • ${search.tracks[0].requester}`)
                        .setColor('#000001')

                    msg.edit({ content: " ", embeds: [playlist] });
                        if(!player.playing) player.play()
                    break;
                
                case "NO_MATCHES":
                    msg.edit({ content: "No results found.", embeds: [] });
                break;
            }
        }).catch(err => msg.edit(err.message))
    }
}