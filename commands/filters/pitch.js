const delay = require('delay');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "pitch",
        description: "Sets the pitch of the song.",
        category: "filters",
		accessableby: "Member",
		usage: '<pitch>',
	},
	
	run: async (client, message, args, user, language, prefix) => {
		const player = client.manager.get(message.guild.id);
		if(!player) return message.channel.send(`${client.i18n.get(language, "noplayer", "no_player")}`);
		const { channel } = message.member.voice;
		if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send(`${client.i18n.get(language, "noplayer", "no_voice")}`);

		if (isNaN(args[0])) return message.channel.send(`${client.i18n.get(language, "filters", "filter_number")}`);
		if (args[0] < 0) return message.channel.send(`${client.i18n.get(language, "filters", "filter_greater")}`);
		if (args[0] > 10) return message.channel.send(`${client.i18n.get(language, "filters", "filter_less")}`);

		const data = {
			op: 'filters',
			guildId: message.guild.id,
			timescale: { pitch: args[0] },
		}

		await player.node.send(data);

		const msg = await message.channel.send(`${client.i18n.get(language, "filters", "pitch_loading", {
			amount: args[0]
		})}`);
		const embed = new MessageEmbed()
			.setDescription(`${client.i18n.get(language, "filters", "pitch_on", {
				amount: args[0]
			})}`)
			.setColor('#000001');
		await delay(5000);
		msg.edit({ content: " ", embeds: [embed] });
	}
};