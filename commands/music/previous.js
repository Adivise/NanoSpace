const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "previous",
        description: "Previous a song!",
        accessableby: "Member",
        category: "music"
    },
    run: async (client, message, args, user, language, prefix) => {
        const msg = await message.channel.send(`${client.i18n.get(language, "music", "previous_loading")}`);

		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);

        if (!player.queue.previous) return msg.edit(`${client.i18n.get(language, "music", "previous_notfound")}`);

        await player.queue.unshift(player.queue.previous);
        await player.stop();

        const embed = new MessageEmbed()
            .setDescription(`${client.i18n.get(language, "music", "previous_msg")}`)
            .setColor('#000001');

        msg.edit({ content: " ", embeds: [embed] });
    }
}