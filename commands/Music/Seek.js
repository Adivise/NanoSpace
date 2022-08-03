const { EmbedBuilder } = require('discord.js');
const formatDuration = require('../../structures/FormatDuration.js')

module.exports = { 
    config: {
        name: "seek",
        description: "Seek timestamp in the song!",
        accessableby: "Member",
        category: "Music",
        usage: "<seconds>"
    },
    run: async (client, message, args, user, language, prefix) => {
        const msg = await message.channel.send(`${client.i18n.get(language, "music", "seek_loading")}`);
        if(isNaN(args[0])) return msg.edit(`${client.i18n.get(language, "music", "seek_invalid", {
            prefix: prefix
        })}`);
        
		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);

		if(args[0] * 1000 >= player.playing.length || args[0] < 0) return msg.edit(`${client.i18n.get(language, "music", "seek_beyond")}`);
		await player.seek(args[0] * 1000);

        const Duration = formatDuration(player.position);

        const seeked = new EmbedBuilder()
            .setDescription(`${client.i18n.get(language, "music", "seek_msg", {
                duration: Duration
            })}`)
            .setColor(client.color);

        msg.edit({ content: ' ', embeds: [seeked] });
    }
}