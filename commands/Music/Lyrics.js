const lyricsfinder = require('lyrics-finder');
const { EmbedBuilder } = require('discord.js');

module.exports = { 
    config: {
        name: "lyrics",
        description: "Display lyrics of a song",
        accessableby: "Member",
        category: "Music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send(`Loading please wait....`);

        const player = client.manager.get(message.guild.id);
        if (!player) return msg.edit(`No playing in this guild!`);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`I'm not in the same voice channel as you!`);

        let song = args.join(" ");
            let CurrentSong = player.queue.current;
        if (!song && CurrentSong) song = CurrentSong.title;

        let lyrics = null;

        try {
            lyrics = await lyricsfinder(song, "");
            if (!lyrics) return msg.edit(`No lyrics found for ${song}`);
        } catch (err) {
            console.log(err);
            return msg.edit(`No lyrics found for ${song}`);
        }
        let lyricsEmbed = new EmbedBuilder()
            .setColor(client.color)
            .setTitle(`Lyrics for ${song}`)
            .setDescription(`${lyrics}`)
            .setFooter({ text: `Requested by ${message.author.username}`})
            .setTimestamp();

        if (lyrics.length > 2048) {
            lyricsEmbed.setDescription(`Lyrics are too long to display!`);
        }

        msg.edit({ content: ' ', embeds: [lyricsEmbed] });
    }
};