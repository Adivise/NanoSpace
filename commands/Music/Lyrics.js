const lyricsfinder = require('lyrics-finder');
const { EmbedBuilder } = require('discord.js');

module.exports = { 
    config: {
        name: "lyrics",
        description: "Display lyrics of a song",
        accessableby: "Member",
        category: "Music",
    },
    run: async (client, message, args, user, language, prefix) => {
        const msg = await message.channel.send(`${client.i18n.get(language, "music", "lyrics_loading")}`);

        const player = client.manager.get(message.guild.id);
        if (!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);

        let song = args.join(" ");
            let CurrentSong = player.queue.current;
        if (!song && CurrentSong) song = CurrentSong.title;

        let lyrics = null;

        try {
            lyrics = await lyricsfinder(song, "");
            if (!lyrics) return msg.edit(`${client.i18n.get(language, "music", "lyrics_notfound")}`);
        } catch (err) {
            console.log(err);
            return msg.edit(`${client.i18n.get(language, "music", "lyrics_notfound")}`);
        }
        let lyricsEmbed = new EmbedBuilder()
            .setColor(client.color)
            .setTitle(`${client.i18n.get(language, "music", "lyrics_title", {
                song: song
            })}`)
            .setDescription(`${lyrics}`)
            .setFooter({ text: `Requested by ${message.author.username}`})
            .setTimestamp();

        if (lyrics.length > 2048) {
            lyricsEmbed.setDescription(`${client.i18n.get(language, "music", "lyrics_toolong")}`);
        }

        msg.edit({ content: ' ', embeds: [lyricsEmbed] });
    }
};