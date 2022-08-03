const { EmbedBuilder } = require('discord.js');
const delay = require('delay');

module.exports = { 
    config: {
        name: "equalizer",
        description: "Sets the equalizer of the current playing song.",
        category: "Filters",
        accessableby: "Member",
        usage: "<2 3 0 8 0 5 0 -5 0 0>",
        aliases: ["eq"]
    },

	run: async (client, message, args, user, language, prefix) => {
		try {
            if (user && user.isPremium) {

				const player = client.manager.get(message.guild.id);
				if(!player) return message.channel.send(`${client.i18n.get(language, "noplayer", "no_player")}`);
				const { channel } = message.member.voice;
				if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return message.channel.send(`${client.i18n.get(language, "noplayer", "no_voice")}`);
				
		if (!args[0]) {
			const embed = new EmbedBuilder()
				.setAuthor({ name: `${client.i18n.get(language, "filters", "eq_author")}`, iconURL: `${client.i18n.get(language, "filters", "eq_icon")}` })
				.setColor(client.color)
				.setDescription(`${client.i18n.get(language, "filters", "eq_desc")}`)
				.addFields({ name: `${client.i18n.get(language, "filters", "eq_field_title")}`, value: `${client.i18n.get(language, "filters", "eq_field_value", {
					prefix: prefix
				})}`, inline: false })
				.setFooter({ text: `${client.i18n.get(language, "filters", "eq_footer", {
					prefix: prefix
				})}` })
			return message.channel.send({ embeds: [embed] });
		}
		else if (args[0] == 'off' || args[0] == 'reset') {
			const data = {
                op: 'filters',
                guildId: message.guild.id,
			}
			return player.node.send(data);
		}

		const bands = args.join(' ').split(/[ ]+/);
		let bandsStr = '';
		for (let i = 0; i < bands.length; i++) {
			if (i > 13) break;
			if (isNaN(bands[i])) return message.channel.send(`${client.i18n.get(language, "filters", "eq_number", {
				num: i + 1
			})}`);
			if (bands[i] > 10) return message.channel.send(`${client.i18n.get(language, "filters", "eq_than", {
				num: i + 1
			})}`);
		}

		for (let i = 0; i < bands.length; i++) {
			if (i > 13) break;
			const data = {
                op: 'filters',
                guildId: message.guild.id,
                equalizer: [
					{ band: i, gain: (bands[i]) / 10 },
                ]
            }
			player.node.send(data);
			bandsStr += `${bands[i]} `;
		}
	
		const msg = await message.channel.send(`${client.i18n.get(language, "filters", "eq_loading", {
			bands: bandsStr
			})}`);
		const embed = new EmbedBuilder()
			.setDescription(`${client.i18n.get(language, "filters", "eq_on", {
				bands: bandsStr
				})}`)
			.setColor(client.color);

		await delay(5000);
        return msg.edit({ content: " ", embeds: [embed] });
	} else {
		const Premiumed = new EmbedBuilder()
			.setAuthor({ name: `${client.i18n.get(language, "nopremium", "premium_author")}`, iconURL: client.user.displayAvatarURL() })
			.setDescription(`${client.i18n.get(language, "nopremium", "premium_desc")}`)
			.setColor(client.color)
			.setTimestamp()

		return message.channel.send({ content: " ", embeds: [Premiumed] });
	  }
	} catch (err) {
		console.log(err)
		message.channel.send({ content: `${client.i18n.get(language, "nopremium", "premium_error")}` })
		}
	}
};