const { EmbedBuilder } = require('discord.js');

module.exports = { 
    config: {
        name: "replay",
        description: "Replay current song!",
        accessableby: "Member",
        category: "Music"
    },
    run: async (client, message, args, user, language, prefix) => {
        const msg = await message.channel.send(`${client.i18n.get(language, "music", "replay_loading")}`);

		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);

        await player.seek(0);

        const embed = new EmbedBuilder()
            .setDescription(`${client.i18n.get(language, "music", "replay_msg")}`)
            .setColor(client.color);

        msg.edit({ content: " ", embeds: [embed] });
    }
}