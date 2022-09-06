const { EmbedBuilder } = require('discord.js');

module.exports = {
    config: {
        name: "loop",
        aliases: ["repeat"],
        description: "Loop song in queue!",
        accessableby: "Member",
        category: "Music",
        usage: "<current, all>"
    },
    run: async (client, message, args) => {
		const msg = await message.channel.send(`Loading please wait....`);

		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit(`No playing in this guild!`);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`I'm not in the same voice channel as you!`);

		if (!args[0] || args[0].toLowerCase() == 'current') {
			if (player.trackRepeat === false) {
				player.setTrackRepeat(true);

				const looped = new EmbedBuilder()
					.setDescription(`\`🔁\` | *Song has been:* \`Looped\``)
					.setColor(client.color);

					msg.edit({ content: " ", embeds: [looped] });
			}
			else {
				player.setTrackRepeat(false);

				const unlooped = new EmbedBuilder()
					.setDescription(`\`🔁\` | *Song has been:* \`Unlooped\``)
					.setColor(client.color);

					msg.edit({ content: " ", embeds: [unlooped] });
			}
		}
		else if (args[0] == 'all') {
			if (player.queueRepeat === true) {
				player.setQueueRepeat(false);

				const unloopall = new EmbedBuilder() //// this is unloop all in queue!
					.setDescription(`\`🔁\` | *Loop all has been:* \`Disabled\``)
					.setColor(client.color);

					msg.edit({ content: " ", embeds: [unloopall] });
			}
			else {
				player.setQueueRepeat(true);

				const loopall = new EmbedBuilder() // this is loop all in queue!
					.setDescription(`\`🔁\` | *Loop all has been:* \`Enabled\``)
					.setColor(client.color);

					msg.edit({ content: " ", embeds: [loopall] });
			}
		}
	}
};