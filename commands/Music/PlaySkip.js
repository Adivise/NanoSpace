const { convertTime } = require("../../structures/ConvertTime.js")
const { EmbedBuilder } = require("discord.js");
const delay = require("delay");

module.exports = { 
    config: {
        name: "playskip",
        description: "Play and skip to a song!",
        usage: "<results>",
        category: "Music",
        accessableby: "Member"
    },
    run: async (client, message, args, user, language, prefix) => {
        const msg = await message.channel.send(`${client.i18n.get(language, "music", "playskip_loading")}`);
        
		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);

        if (!args[0]) return msg.edit(`${client.i18n.get(language, "music", "playskip_arg")}`);

        const search = args.join(" ");

        /// Clear song
        await player.queue.clear();
        /// Clear nowplaying
        await client.clearInterval(client.interval);

        /// Search song and play!
        const res = await client.manager.search(search, message.author);
        if(res.loadType != "NO_MATCHES") {
            if(res.loadType == "TRACK_LOADED") {
                await player.queue.unshift(res.tracks[0]);
                await skipped(player);
                const embed = new EmbedBuilder() //**Queued • [${res.tracks[0].title}](${res.tracks[0].uri})** \`${convertTime(res.tracks[0].duration, true)}\` • ${res.tracks[0].requester}
                    .setDescription(`${client.i18n.get(language, "music", "playskip_track", {
                        title: res.tracks[0].title,
                        url: res.tracks[0].uri,
                        duration: convertTime(res.tracks[0].duration, true),
                        request: res.tracks[0].requester
                    })}`)
                    .setColor(client.color)
                msg.edit({ content: " ", embeds: [embed] });
                if(!player.playing) player.play();
            }
            else if(res.loadType == "PLAYLIST_LOADED") {
                await player.queue.unshift(res.tracks);
                await skipped(player);
                const embed = new EmbedBuilder() //**Queued • [${res.playlist.name}](${search})** \`${convertTime(res.playlist.duration)}\` (${res.tracks.length} tracks) • ${res.tracks[0].requester}
                    .setDescription(`${client.i18n.get(language, "music", "playskip_playlist", {
                        title: res.playlist.name,
                        url: search,
                        duration: convertTime(res.playlist.duration),
                        songs: res.tracks.length,
                        request: res.tracks[0].requester
                    })}`)
                    .setColor(client.color)
                msg.edit({ content: " ", embeds: [embed] });
                if(!player.playing) player.play();
            }
            else if(res.loadType == "SEARCH_RESULT") {
                await player.queue.unshift(res.tracks[0]);
                await skipped(player);
                const embed = new EmbedBuilder()
                    .setDescription(`${client.i18n.get(language, "music", "playskip_result", {
                        title: res.tracks[0].title,
                        url: res.tracks[0].uri,
                        duration: convertTime(res.tracks[0].duration, true),
                        request: res.tracks[0].requester
                    })}`)
                    .setColor(client.color)
                msg.edit({ content: " ", embeds: [embed] });
                if(!player.playing) player.play();
            }
            else if(res.loadType == "LOAD_FAILED") {
                msg.edit(`${client.i18n.get(language, "music", "playskip_fail")}`);
                player.destroy();
            }
        }
        else {
            msg.edit(`${client.i18n.get(language, "music", "playskip_match")}`);
            player.destroy();
        }
    }
}

function skipped(player) {
    return player.stop();
}