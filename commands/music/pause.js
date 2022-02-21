const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "pause",
        aliases: ["pa"],
        description: "Pause song in queue!",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args, user, language, prefix) => {
        const msg = await message.channel.send(`${client.i18n.get(language, "music", "pause_loading")}`);

		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);
        
        await player.pause(player.playing);
        const uni = player.paused ? `${client.i18n.get(language, "music", "pause_switch_pause")}` : `${client.i18n.get(language, "music", "pause_switch_resume")}`;

        const embed = new MessageEmbed()
            .setDescription(`${client.i18n.get(language, "music", "pause_msg", {
                pause: uni
            })}`)
            .setColor('#000001');

        msg.edit({ content: " ", embeds: [embed] });
    }
}