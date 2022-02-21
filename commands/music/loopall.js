const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "loopall",
        aliases: ["repeatall", 'lq', 'loopqueue'],
        description: "Loop all songs in queue!",
        accessableby: "Member",
        category: "music"
    },
    run: async (client, message, args, user, language, prefix) => {
		const msg = await message.channel.send(`${client.i18n.get(language, "music", "loopall_loading")}`);

		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);

		if (player.queueRepeat === true) {
            player.setQueueRepeat(false)
            
            const unloopall = new MessageEmbed()
                .setDescription(`${client.i18n.get(language, "music", "unloopall")}`)
                .setColor('#000001');

                msg.edit({ content: ' ', embeds: [unloopall] });
		}
		else {
            player.setQueueRepeat(true);
            
            const loopall = new MessageEmbed()
                .setDescription(`${client.i18n.get(language, "music", "loopall")}`)
                .setColor('#000001');

                msg.edit({ content: ' ', embeds: [loopall] });
		}
	}
};