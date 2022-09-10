const { EmbedBuilder } = require('discord.js');
const Playlist = require('../../settings/models/Playlist.js');
const { convertTime } = require("../../structures/ConvertTime.js")

const TrackAdd = [];

module.exports = { 
    config: {
        name: "add",
        usage: "<playlist name> <playlist link>",
        description: "Add song to a playlist",
        accessableby: "Premium",
        category: "Playlist",
    },
    run: async (client, message, args, user, language, prefix) => {

        try {
            if (user && user.isPremium) {

        if(!args[0]) return message.channel.send(`${client.i18n.get(language, "playlist", "add_arg", {
            prefix: prefix
        })}`);
        if(!args[1]) return message.channel.send(`${client.i18n.get(language, "playlist", "add_arg", {
            prefix: prefix
        })}`);

        const PlaylistName = args[0].replace(/_/g, ' ');
        const Inputed = args[1];

        const msg = await message.channel.send(`${client.i18n.get(language, "playlist", "add_loading")}`);

        const res = await client.manager.search(Inputed, message.author.id);

        const Duration = convertTime(res.tracks[0].duration, true);

        if(res.loadType != "NO_MATCHES") {
            if(res.loadType == "TRACK_LOADED") {
                TrackAdd.push(res.tracks[0])
                const embed = new EmbedBuilder()
                    .setDescription(`${client.i18n.get(language, "playlist", "add_track", {
                        title: res.tracks[0].title,
                        url: res.tracks[0].uri,
                        duration: Duration,
                        user: message.author
                        })}`)
                    .setColor(client.color)
                msg.edit({ content: " ", embeds: [embed] });
            }
            else if(res.loadType == "PLAYLIST_LOADED") {
                for (let t = 0; t < res.tracks.length; t++) {
                    TrackAdd.push(res.tracks[t]);
                }
                const embed = new EmbedBuilder()
                    .setDescription(`${client.i18n.get(language, "playlist", "add_playlist", {
                        title: res.playlist.name,
                        url: Inputed,
                        duration: convertTime(res.playlist.duration),
                        track: res.tracks.length,
                        user: message.author
                        })}`)
                    .setColor(client.color)
                msg.edit({ content: " ", embeds: [embed] });
            }
            else if(res.loadType == "SEARCH_RESULT") {
                TrackAdd.push(res.tracks[0]);
                const embed = new EmbedBuilder()
                    .setDescription(`${client.i18n.get(language, "playlist", "add_search", {
                        title: res.tracks[0].title,
                        url: res.tracks[0].uri,
                        duration: Duration,
                        user: message.author
                        })}`)
                    .setColor(client.color)
                msg.edit({ content: " ", embeds: [embed] });
            }
            else if(res.loadType == "LOAD_FAILED") { //Error loading playlist.
                return msg.edit(`${client.i18n.get(language, "playlist", "add_fail")}`);
            }
        }
        else { //The playlist link is invalid.
            return msg.edit(`${client.i18n.get(language, "playlist", "add_match")}`);
        }

        Playlist.findOne({ name: PlaylistName }).then(playlist => {
            if(playlist) {
                if(playlist.owner !== message.author.id) { message.channel.send(`${client.i18n.get(language, "playlist", "add_owner")}`); TrackAdd.length = 0; return; }
                const LimitTrack = playlist.tracks.length + TrackAdd.length;
                if(LimitTrack > client.config.LIMIT_TRACK) { message.channel.send(`${client.i18n.get(language, "playlist", "add_limit_track", {
                    limit: client.config.LIMIT_TRACK
                })}`); TrackAdd.length = 0; return; }
                for (let songs = 0; songs < TrackAdd.length; songs++) {
                    playlist.tracks.push(TrackAdd[songs]);
                }
                playlist.save().then(() => {
                const embed = new EmbedBuilder()
                    .setDescription(`${client.i18n.get(language, "playlist", "add_added", {
                        count: TrackAdd.length,
                        playlist: PlaylistName
                        })}`)
                    .setColor(client.color)
                message.channel.send({ content: " ", embeds: [embed] });

                TrackAdd.length = 0;
                });
            }
        }).catch(err => console.log(err));
    } else {
        const Premiumed = new EmbedBuilder()
            .setAuthor({ name: `${client.i18n.get(language, "nopremium", "premium_author")}`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`${client.i18n.get(language, "nopremium", "premium_desc")}`)
            .setColor(client.color)
            .setTimestamp()

        return message.channel.send({ content: " ", embeds: [Premiumed] });
      }
    } catch (err) {
        console.log(err)
        message.channel.send({ content: `${client.i18n.get(language, "nopremium", "premium_error")}` })
        }
    }
};