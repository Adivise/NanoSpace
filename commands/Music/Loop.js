const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "loop",
        aliases: ["repeat"],
        description: "Loop song in queue!",
        accessableby: "Member",
        category: "Music",
        usage: "<current, all>"
    },
    run: async (client, message, args, user, language, prefix) => {
		const msg = await message.channel.send(`${client.i18n.get(language, "music", "loop_loading")}`);

		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);

		if (!args[0] || args[0].toLowerCase() == 'current') {
			if (player.trackRepeat === false) {
				player.setTrackRepeat(true);

				const looped = new MessageEmbed()
					.setDescription(`${client.i18n.get(language, "music", "loop_current")}`)
					.setColor(client.color);

					msg.edit({ content: " ", embeds: [looped] });
			}
			else {
				player.setTrackRepeat(false);

				const unlooped = new MessageEmbed()
					.setDescription(`${client.i18n.get(language, "music", "unloop_current")}`)
					.setColor(client.color);

					msg.edit({ content: " ", embeds: [unlooped] });
			}
		}
		else if (args[0] == 'all') {
			if (player.queueRepeat === true) {
				player.setQueueRepeat(false);

				const unloopall = new MessageEmbed() //// this is unloop all in queue!
					.setDescription(`${client.i18n.get(language, "music", "unloop_all")}`)
					.setColor(client.color);

					msg.edit({ content: " ", embeds: [unloopall] });
			}
			else {
				player.setQueueRepeat(true);

				const loopall = new MessageEmbed() // this is loop all in queue!
					.setDescription(`${client.i18n.get(language, "music", "loop_all")}`)
					.setColor(client.color);

					msg.edit({ content: " ", embeds: [loopall] });
			}
		}
	}
};