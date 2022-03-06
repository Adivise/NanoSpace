const lyricsfinder = require('lyrics-finder');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    name: "lyrics",
    description: "Display lyrics of a song.",
    options: [
        {
            name: "input",
            description: "The song you want to find lyrics for",
            type: 3,
            required: false,
        }
    ],
    run: async (interaction, client, user, language) => {
        await interaction.deferReply({ ephemeral: false });
        const value = interaction.options.getString("input");
        const msg = await interaction.editReply(`${client.i18n.get(language, "music", "lyrics_loading")}`);

        const player = client.manager.get(interaction.guild.id);
        if (!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);

        let song = value;
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
        let lyricsEmbed = new MessageEmbed()
            .setColor(client.color)
            .setTitle(`${client.i18n.get(language, "music", "lyrics_title", {
                song: song
            })}`)
            .setDescription(`${lyrics}`)
            .setFooter({ text: `Requested by ${interaction.user.username}`})
            .setTimestamp();

        if (lyrics.length > 2048) {
            lyricsEmbed.setDescription(`${client.i18n.get(language, "music", "lyrics_toolong")}`);
        }

        msg.edit({ content: ' ', embeds: [lyricsEmbed] });
    }
};