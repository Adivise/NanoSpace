const { EmbedBuilder } = require('discord.js');

module.exports = { 
    config: {
        name: "volume",
        aliases: ["vol", "v"],
        description: "Adjusts the volume of the bot.",
        accessableby: "Member",
        category: "Music",
        usage: "<input>"
    },
    run: async (client, message, args, user, language, prefix) => {
        const msg = await message.channel.send(`${client.i18n.get(language, "music", "volume_loading")}`);

		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);

        if (!args[0]) return msg.edit(`${client.i18n.get(language, "music", "volume_usage", {
            volume: player.volume
        })}`);
        if (Number(args[0]) <= 0 || Number(args[0]) > 100) return msg.edit(`${client.i18n.get(language, "music", "volume_invalid")}`);

        await player.setVolume(Number(args[0]));

        const changevol = new EmbedBuilder()
            .setDescription(`${client.i18n.get(language, "music", "volume_msg", {
                volume: args[0]
            })}`)
            .setColor(client.color);
        
        msg.edit({ content: " ", embeds: [changevol] });
    }
}