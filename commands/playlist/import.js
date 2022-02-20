const { MessageEmbed, Permissions } = require('discord.js');
const Playlist = require('../../settings/models/Playlist.js');
const { convertTime } = require('../../structures/convert.js');

module.exports = { 
    config: {
        name: "import",
        aliases: ["load"],
		usage: "<playlist name>",
        description: "Import a playlist to the queue",
        accessableby: "Member",
        category: "playlist",
    },
    run: async (client, message, args, user, language, prefix) => {

		const { channel } = message.member.voice;
		if (!channel) return message.channel.send(`${client.i18n.get(language, "playlist", "import_voice")}`);
		if (!channel.permissionsFor(message.guild.me).has(Permissions.FLAGS.CONNECT)) return message.channel.send(`${client.i18n.get(language, "playlist", "import_join")}`);
		if (!channel.permissionsFor(message.guild.me).has(Permissions.FLAGS.SPEAK)) return message.channel.send(`${client.i18n.get(language, "playlist", "import_speak")}`);

		try {
			if (user && user.isPremium) {
			if(!args[0]) return message.channel.send(`${client.i18n.get(language, "playlist", "import_arg", {
				prefix: prefix
				})}`);

		let player = client.manager.get(message.guild.id);
		if(!player) { player = await client.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            selfDeafen: true,
        });

		const state = player.state;
        if (state != "CONNECTED") await player.connect();

		}

		const Plist = args.join(" ").replace(/_/g, ' ');
		const SongAdd = [];
		let SongLoad = 0;

		const playlist = await Playlist.findOne({ name: Plist });
		if(!playlist) return message.channel.send(`${client.i18n.get(language, "playlist", "import_notfound")}`);
		if(playlist.owner !== message.author.id) return message.channel.send(`${client.i18n.get(language, "playlist", "import_owner")}`);

		const totalDuration = convertTime(playlist.tracks.reduce((acc, cur) => acc + cur.duration, 0));

		const msg = await message.channel.send(`${client.i18n.get(language, "playlist", "import_loading")}`);

		const embed = new MessageEmbed() // **Imported • \`${Plist}\`** (${playlist.tracks.length} tracks) • ${message.author}
			.setDescription(`${client.i18n.get(language, "playlist", "import_imported", {
				name: Plist,
				tracks: playlist.tracks.length,
				duration: totalDuration,
				user: message.author
			})}`)
			.setColor('#000001')

		msg.edit({ content: " ", embeds: [embed] });

		for (let i = 0; i < playlist.tracks.length; i++) {
			const res = await client.manager.search(playlist.tracks[i].uri, message.author);
			if(res.loadType != "NO_MATCHES") {
				if(res.loadType == "TRACK_LOADED") {
					SongAdd.push(res.tracks[0]);
					SongLoad++;
				}
				else if(res.loadType == "PLAYLIST_LOADED") {
					for (let t = 0; t < res.playlist.tracks.length; t++) {
						SongAdd.push(res.playlist.tracks[t]);
						SongLoad++;
					}
				}
				else if(res.loadType == "SEARCH_RESULT") {
					SongAdd.push(res.tracks[0]);
					SongLoad++;
				}
				else if(res.loadType == "LOAD_FAILED") {
					return message.channel.send(`${client.i18n.get(language, "playlist", "import_fail")}`);
				}
			}
			else {
				return message.channel.send(`${client.i18n.get(language, "playlist", "import_match")}`);
			}

			if(SongLoad == playlist.tracks.length) {
				player.queue.add(SongAdd);
				if (!player.playing) { player.play(); }
			}
		}
    } else {
        const Premiumed = new MessageEmbed()
            .setAuthor({ name: `${client.i18n.get(language, "nopremium", "premiun_author")}`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`${client.i18n.get(language, "nopremium", "premiun_desc")}`)
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