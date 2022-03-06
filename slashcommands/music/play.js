const { convertTime } = require("../../structures/convert.js")
const { MessageEmbed, Permissions } = require("discord.js");

module.exports = { 
    name: "play",
    description: "Play a song from any types.",
    options: [
        {
            name: "input",
            description: "The input of the song",
            type: 3,
            required: true,
        }
    ],
    run: async (interaction, client, user, language) => {
        await interaction.deferReply({ ephemeral: false });
        const value = interaction.options.get("input").value;
        const msg = await interaction.editReply(`${client.i18n.get(language, "music", "play_loading")}`);
        
        const { channel } = interaction.member.voice;
		if (!channel) return msg.edit(`${client.i18n.get(language, "music", "play_invoice")}`);
		if (!channel.permissionsFor(interaction.guild.me).has(Permissions.FLAGS.CONNECT)) return msg.edit(`${client.i18n.get(language, "music", "play_join")}`);
		if (!channel.permissionsFor(interaction.guild.me).has(Permissions.FLAGS.SPEAK)) return msg.edit(`${client.i18n.get(language, "music", "play_speak")}`);

        const player = await client.manager.create({
            guild: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id,
            selfDeafen: true,
        });
        
        const state = player.state;
        if (state != "CONNECTED") await player.connect();
        const res = await client.manager.search(value, interaction.user);
        if(res.loadType != "NO_MATCHES") {
            if(res.loadType == "TRACK_LOADED") {
                player.queue.add(res.tracks[0]);
                const embed = new MessageEmbed()
                    .setDescription(`${client.i18n.get(language, "music", "play_track", {
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
                player.queue.add(res.tracks)
                const embed = new MessageEmbed()
                    .setDescription(`${client.i18n.get(language, "music", "play_playlist", {
                        title: res.playlist.name,
                        url: value,
                        duration: convertTime(res.playlist.duration),
                        songs: res.tracks.length,
                        request: res.tracks[0].requester
                    })}`)
                    .setColor(client.color)
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
                    .setColor(client.color)
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