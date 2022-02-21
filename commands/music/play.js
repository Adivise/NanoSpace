const { convertTime } = require("../../structures/convert.js")
const { MessageEmbed, Permissions } = require("discord.js");

module.exports = { 
    config: {
        name: "play",
        description: "Play a song/playlist or search for a song from youtube",
        usage: "<results>",
        category: "music",
        accessableby: "Member",
        aliases: ["p", "pplay"]
    },
    run: async (client, message, args, user, language, prefix) => {
        const msg = await message.channel.send(`${client.i18n.get(language, "music", "play_loading")}`);
        
        const { channel } = message.member.voice;
		if (!channel) return msg.edit(`${client.i18n.get(language, "music", "play_invoice")}`);
		if (!channel.permissionsFor(message.guild.me).has(Permissions.FLAGS.CONNECT)) return msg.edit(`${client.i18n.get(language, "music", "play_join")}`);
		if (!channel.permissionsFor(message.guild.me).has(Permissions.FLAGS.SPEAK)) return msg.edit(`${client.i18n.get(language, "music", "play_speak")}`);

        if (!args[0]) return msg.edit(`${client.i18n.get(language, "music", "play_arg")}`);

        const player = await client.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            selfDeafen: true,
        });

        const search = args.join(" ");
        
        const state = player.state;
        if (state != "CONNECTED") await player.connect();
        const res = await client.manager.search(search, message.author);
        if(res.loadType != "NO_MATCHES") {
            if(res.loadType == "TRACK_LOADED") {
                player.queue.add(res.tracks[0]);
                const embed = new MessageEmbed() //**Queued • [${res.tracks[0].title}](${res.tracks[0].uri})** \`${convertTime(res.tracks[0].duration, true)}\` • ${res.tracks[0].requester}
                    .setDescription(`${client.i18n.get(language, "music", "play_track", {
                        title: res.tracks[0].title,
                        url: res.tracks[0].uri,
                        duration: convertTime(res.tracks[0].duration, true),
                        request: res.tracks[0].requester
                    })}`)
                    .setColor('#000001')
                msg.edit({ content: " ", embeds: [embed] });
                if(!player.playing) player.play();
            }
            else if(res.loadType == "PLAYLIST_LOADED") {
                player.queue.add(res.tracks)
                const embed = new MessageEmbed() //**Queued • [${res.playlist.name}](${search})** \`${convertTime(res.playlist.duration)}\` (${res.tracks.length} tracks) • ${res.tracks[0].requester}
                    .setDescription(`${client.i18n.get(language, "music", "play_playlist", {
                        title: res.playlist.name,
                        url: search,
                        duration: convertTime(res.playlist.duration),
                        songs: res.tracks.length,
                        request: res.tracks[0].requester
                    })}`)
                    .setColor('#000001')
                msg.edit({ content: " ", embeds: [embed] });
                if(!player.playing) player.play();
            }
            else if(res.loadType == "SEARCH_RESULT") {
                player.queue.add(res.tracks[0]);
                const embed = new MessageEmbed()
                    .setDescription(`${client.i18n.get(language, "music", "play_result", {
                        title: res.tracks[0].title,
                        url: res.tracks[0].uri,
                        duration: convertTime(res.tracks[0].duration, true),
                        request: res.tracks[0].requester
                    })}`)
                    .setColor('#000001')
                msg.edit({ content: " ", embeds: [embed] });
                if(!player.playing) player.play();
            }
            else if(res.loadType == "LOAD_FAILED") {
                return msg.edit(`${client.i18n.get(language, "music", "play_fail")}`);
            }
        }
        else {
            return msg.edit(`${client.i18n.get(language, "music", "play_match")}`);
        }
    }
}