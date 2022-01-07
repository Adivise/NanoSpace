const chalk = require('chalk');
const { MessageEmbed } = require("discord.js");
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
        const msg = await message.channel.send('Loading please wait...')

        const { channel } = message.member.voice;
        if (!channel) return msg.edit("You need to be in a voice channel to play music.");
        if (!args[0]) return msg.edit("Please provide a song name or link to search.");

        const player = client.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            selfDeafen: true,
        });

        const state = player.state;
        if (state != "CONNECTED") await player.connect();
        client.manager.search(args.join(" "), message.author).then(async res => {
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
                    const tracks = res.tracks.slice(0, 5);

                    const results = res.tracks
                        .slice(0, 5)
                        .map(video => `**(${index++}.) [${video.title}](${video.uri})** \`${convertTime(video.duration)}\` Author: \`${video.author}\``)
                        .join("\n");

                    const playing = new MessageEmbed()
                        .setAuthor({ name: `Song Selection...`, iconURL: message.guild.iconURL({ dynamic: true }) })
                        .setColor('#000001')
                        .setDescription(results)
                        .setFooter({ text: `Please type 1-5 select the song in 30s type cancel to Cancel`});

                    await msg.edit({ content: " ", embeds: [playing] })

                    const collector = message.channel.createMessageCollector(m => {
                        return m.author.id === message.author.id && new RegExp(`^([1-5]|cancel)$`, "i").test(m.content)
                    }, { time: 30000, max: 1 });

                    collector.on("collect", m => {
                        if (/cancel/i.test(m.content)) return collector.stop("cancelled")

                        const track = tracks[Number(m.content) - 1];
                        player.queue.add(track)

                        const embed = new MessageEmbed()
                            .setDescription(`**Queued • [${track.title}](${track.uri})** \`${convertTime(track.duration)}\` • ${track.requester}`)
                            .setColor('#000001');

                        msg.edit({ content: " ", embeds: [embed] });
                            console.log(chalk.magenta(`[COMMAND] Search used by ${message.author.tag} from ${message.guild.name}`));
                        if(!player.playing) player.play();
                    });

                    collector.on("end", (_, reason) => {
                        if(["time", "cancelled"].includes(reason)) return msg.edit({ content: "Cancelled Selection", embeds: [] });
                    });
                    break;

                case "PLAYLIST_LOADED":
                    let search = await player.search(args.join(" "), message.author);
                    player.queue.add(search.tracks)

                    const playlist = new MessageEmbed()
                        .setDescription(`**Queued** • [${search.playlist.name}](${args.join(" ")}) \`${convertTime(search.playlist.duration)}\` (${search.tracks.length} tracks) • ${search.tracks[0].requester}`)
                        .setColor('#000001')

                    msg.edit({ content: " ", embeds: [playlist] });
                        console.log(chalk.magenta(`[COMMAND]: Search used by ${message.author.tag} from ${message.guild.name}`));
                        if(!player.playing) player.play()
                    break;
            }
        }).catch(err => msg.edit(err.message))
    }
}