const { convertTime } = require("../../structures/convert.js")
const chalk = require('chalk');
const { MessageEmbed } = require("discord.js");

module.exports = { 
    config: {
        name: "play",
        description: "Play a song/playlist or search for a song from youtube",
        usage: "<results>",
        category: "music",
        accessableby: "Member",
        aliases: ["p", "pplay"]
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send('Loading please wait...')
        const { channel } = message.member.voice;
        if (!channel) return msg.edit("You need to be in a voice channel to use command.");
        if (!args[0]) return msg.edit("Please provide a song name or link to search.");
      //  if (args.join(" ").startsWith("https://open.spotify.com/artist/")) return msg.edit("Please use spotify `playlists, album or track` this `artist` not support!");

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
                        console.log(chalk.magenta(`[COMMAND] Play used by ${message.author.tag} from ${message.guild.name}`));
                    if (!player.playing) player.play()
                    break;
                
                case "SEARCH_RESULT":
                const res1 = await client.manager.search(
                    message.content.slice(6),
                    message.author
                );
                    player.queue.add(res1.tracks[0]);

                    const embed1 = new MessageEmbed()
                        .setDescription(`**Queued • [${res1.tracks[0].title}](${res1.tracks[0].uri})** \`${convertTime(res1.tracks[0].duration, true)}\` • ${res1.tracks[0].requester}`)
                        .setColor('#000001')
            
                      msg.edit({ content: " ", embeds: [embed1] });
                        console.log(chalk.magenta(`[COMMAND] Play used by ${message.author.tag} from ${message.guild.name}`));
                      if (!player.playing) player.play()
                    break;

                case "PLAYLIST_LOADED":
                    let search = await player.search(args.join(" "), message.author);
                    player.queue.add(search.tracks)

                    const playlist = new MessageEmbed()
                        .setDescription(`**Queued** • [${search.playlist.name}](${args.join(" ")}) \`${convertTime(search.playlist.duration)}\` (${search.tracks.length} tracks) • ${search.tracks[0].requester}`)
                        .setColor('#000001')

                    msg.edit({ content: " ", embeds: [playlist] });
                        console.log(chalk.magenta(`[COMMAND] Play used by ${message.author.tag} from ${message.guild.name}`));
                        if(!player.playing) player.play()
                    break;
            }
        }).catch(err => msg.edit(err.message))
    }
}