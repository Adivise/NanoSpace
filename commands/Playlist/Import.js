const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const Playlist = require('../../settings/models/Playlist.js');
const { convertTime } = require('../../structures/ConvertTime.js');

module.exports = { 
    config: {
        name: "import",
        aliases: ["load"],
		usage: "<playlist name>",
        description: "Import a playlist to the queue",
        accessableby: "Premium",
        category: "Playlist",
    },
    run: async (client, message, args, user, language, prefix) => {

		const { channel } = message.member.voice;
		if (!channel) return message.channel.send(`${client.i18n.get(language, "playlist", "import_voice")}`);
		if (!channel.permissionsFor(message.guild.members.me).has(PermissionsBitField.Flags.Connect)) return message.channel.send(`${client.i18n.get(language, "playlist", "import_join")}`);
		if (!channel.permissionsFor(message.guild.members.me).has(PermissionsBitField.Flags.Speak)) return message.channel.send(`${client.i18n.get(language, "playlist", "import_speak")}`);

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
		if(!playlist) { message.channel.send(`${client.i18n.get(language, "playlist", "import_notfound")}`); return; }
		if(playlist.private && playlist.owner !== message.author.id) { message.channel.send(`${client.i18n.get(language, "playlist", "import_private")}`); return; }

		const totalDuration = convertTime(playlist.tracks.reduce((acc, cur) => acc + cur.duration, 0));

		const msg = await message.channel.send(`${client.i18n.get(language, "playlist", "import_loading")}`);

		const embed = new EmbedBuilder() // **Imported • \`${Plist}\`** (${playlist.tracks.length} tracks) • ${message.author}
			.setDescription(`${client.i18n.get(language, "playlist", "import_imported", {
				name: Plist,
				tracks: playlist.tracks.length,
				duration: totalDuration,
				user: message.author
			})}`)
			.setColor(client.color)

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
					{ message.channel.send(`${client.i18n.get(language, "playlist", "import_fail")}`); player.destroy(); return; }
				}
			}
			else {
				{ message.channel.send(`${client.i18n.get(language, "playlist", "import_match")}`); player.destroy(); return; }
			}

			if(SongLoad == playlist.tracks.length) {
				player.queue.add(SongAdd);
				if (!player.playing) { player.play(); }
			}
		}
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