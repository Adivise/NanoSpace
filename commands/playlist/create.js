const { MessageEmbed } = require('discord.js');
const Playlist = require('../../settings/models/Playlist.js');
const { convertTime } = require("../../structures/convert.js")

const TrackAdd = [];

module.exports = { 
    config: {
        name: "create",
        usage: "<playlist link> <playlist name>",
        description: "Create or add to a playlist",
        accessableby: "Member",
        category: "playlist",
    },
    run: async (client, message, args, user, language, prefix) => {

        try {
            if (user && user.isPremium) {

        if(!args[0]) return message.channel.send(`${client.i18n.get(language, "playlist", "create_arg", {
            prefix: prefix
        })}`);
        if(!args[1]) return message.channel.send(`${client.i18n.get(language, "playlist", "create_arg", {
            prefix: prefix
        })}`);
        if(args[1].length > 16) return message.channel.send(`${client.i18n.get(language, "playlist", "create_toolong")}`);

        const PlaylistName = args[1].replace(/_/g, ' ');
        const Inputed = args[0];

        const msg = await message.channel.send(`${client.i18n.get(language, "playlist", "create_loading")}`);

        const res = await client.manager.search(Inputed, message.author.id);

        const Duration = convertTime(res.tracks[0].duration, true);
      //  const TotalDuration = convertTime(res.playlist.duration, true);

        if(res.loadType != "NO_MATCHES") {
            if(res.loadType == "TRACK_LOADED") {
                TrackAdd.push(res.tracks[0])
                const embed = new MessageEmbed() //Searched • [${res.tracks[0].title}](${res.tracks[0].uri}) • ${message.author}
                    .setDescription(`${client.i18n.get(language, "playlist", "create_track", {
                        title: res.tracks[0].title,
                        url: res.tracks[0].uri,
                        duration: Duration,
                        user: message.author
                        })}`)
                    .setColor('#000001')
                msg.edit({ content: " ", embeds: [embed] }).then(msg => {
                //    message.delete()
                    setTimeout(() => msg.delete(), 5000)
                  });
            }
            else if(res.loadType == "PLAYLIST_LOADED") {
                for (let t = 0; t < res.tracks.length; t++) {
                    TrackAdd.push(res.tracks[t]);
                }
                const embed = new MessageEmbed() //Searched • [${res.playlist.name}](${args[0]}) \`${TotalDuration}\` (${res.tracks.length} tracks) • ${message.author}
                    .setDescription(`${client.i18n.get(language, "playlist", "create_playlist", {
                        title: res.playlist.name,
                        url: Inputed,
                        duration: convertTime(res.playlist.duration),
                        track: res.tracks.length,
                        user: message.author
                        })}`)
                    .setColor('#000001')
                msg.edit({ content: " ", embeds: [embed] }).then(msg => {
                 //   message.delete()
                    setTimeout(() => msg.delete(), 5000)
                  });
            }
            else if(res.loadType == "SEARCH_RESULT") {
                TrackAdd.push(res.tracks[0]);
                const embed = new MessageEmbed() //Searched • [${res.tracks[0].title}](${res.tracks[0].uri}) • ${message.author}
                    .setDescription(`${client.i18n.get(language, "playlist", "create_search", {
                        title: res.tracks[0].title,
                        url: res.tracks[0].uri,
                        duration: Duration,
                        user: message.author
                        })}`)
                    .setColor('#000001')
                msg.edit({ content: " ", embeds: [embed] }).then(msg => {
                  //  message.delete()
                    setTimeout(() => msg.delete(), 5000)
                  });
            }
            else if(res.loadType == "LOAD_FAILED") { //Error loading playlist.
                return msg.edit(`${client.i18n.get(language, "playlist", "create_fail")}`).then(msg => {
                 //   message.delete()
                    setTimeout(() => msg.delete(), 5000)
                  });
            }
        }
        else { //The playlist link is invalid.
            return msg.edit(`${client.i18n.get(language, "playlist", "create_match")}`).then(msg => {
              //  message.delete()
                setTimeout(() => msg.delete(), 5000)
              });
        }

        const LimitPlaylist = await Playlist.find({ owner: message.author.id }).countDocuments();

        Playlist.findOne({ name: PlaylistName }).then(playlist => {
            if(playlist) {
                if(playlist.owner !== message.author.id) return message.channel.send(`${client.i18n.get(language, "playlist", "create_owner")}`);
                const LimitTrack = playlist.tracks.length + TrackAdd.length; //You can't add more than ${client.config.LIMIT_TRACK} tracks to this playlist.
                if(LimitTrack > client.config.LIMIT_TRACK) return message.channel.send(`${client.i18n.get(language, "playlist", "create_limit_track", {
                    limit: client.config.LIMIT_TRACK
                })}`);
                for (let songs = 0; songs < TrackAdd.length; songs++) {
                    playlist.tracks.push(TrackAdd[songs]);
                }
                playlist.save().then(() => {
                const embed = new MessageEmbed() //**Added • [\`${TrackAdd.length} track's\`] | Playlist • ${PlaylistName}**
                    .setDescription(`${client.i18n.get(language, "playlist", "create_added", {
                        count: TrackAdd.length,
                        playlist: PlaylistName
                        })}`)
                    .setColor('#000001')
                message.channel.send({ content: " ", embeds: [embed] });

                TrackAdd.length = 0;
                }).catch(err => console.log(err));
            }
            else {
                if(TrackAdd.length > client.config.LIMIT_TRACK)  return message.channel.send(`${client.i18n.get(language, "playlist", "create_limit_track", {
                    limit: client.config.LIMIT_TRACK
                })}`);
                if(LimitPlaylist >= client.config.LIMIT_PLAYLIST) return message.channel.send(`${client.i18n.get(language, "playlist", "create_limit_playlist", {
                    limit: client.config.LIMIT_PLAYLIST
                })}`);
                const CreateNew = new Playlist({
                    name: PlaylistName,
                    owner: message.author.id,
                    tracks: TrackAdd,
                    created: Date.now()
                });
                CreateNew.save().then(() => {
                    const embed = new MessageEmbed() //**Created • ${PlaylistName} | Added • [\`${TrackAdd.length} track's\`]**
                    .setDescription(`${client.i18n.get(language, "playlist", "create_created", {
                        playlist: PlaylistName,
                        count: TrackAdd.length
                        })}`)
                    .setColor('#000001')
                message.channel.send({ content: " ", embeds: [embed] });
                    TrackAdd.length = 0;
                });
            }
        }).catch(err => console.log(err));
    } else {
        const Premiumed = new MessageEmbed()
            .setAuthor({ name: `${client.i18n.get(language, "nopremium", "premium_author")}`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`${client.i18n.get(language, "nopremium", "premium_desc")}`)
            .setColor("#000001")
            .setTimestamp()

        return message.channel.send({ embeds: [Premiumed] });
      }
    } catch (err) {
        console.log(err)
        message.channel.send({ content: `${client.i18n.get(language, "nopremium", "premium_error")}` })
        }
    }
};