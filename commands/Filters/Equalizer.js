const { EmbedBuilder } = require('discord.js');

module.exports = { 
    config: {
        name: "equalizer",
        description: "Sets the equalizer of the current playing song.",
        category: "Filters",
        accessableby: "Member",
        usage: "<2 3 0 8 0 5 0 -5 0 0>",
        aliases: ["eq"]
    },
	run: async (client, message, args) => {
			const player = client.manager.get(message.guild.id);
			if(!player) return message.channel.send(`No playing in this guild!`);
			const { channel } = message.member.voice;
			if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return message.channel.send(`I'm not in the same voice channel as you!`);
				
		if (!args[0]) {
			const embed = new EmbedBuilder()
				.setAuthor({ name: `Custom Equalizer`, iconURL: `${client.i18n.get(language, "filters", "eq_icon")}` })
				.setColor(client.color)
				.setDescription(`There are 14 bands that can be set from -10 to 10. Not all bands have to be filled out.`)
				.addFields({ name: `Example:`, value: `${client.prefix}eq 2 3 0 8 0 5 0 -5 0 0`, inline: false })
				.setFooter({ text: `Reset equalizer type: ${client.prefix}eq reset` })
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
			if (isNaN(bands[i])) return message.channel.send(`Band #${i + 1} is not a valid number.`);
			if (bands[i] > 10) return message.channel.send(`Band #${i + 1} must be less than 10.`);
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
	
		const msg = await message.channel.send(`Setting **Equalizer** to... \`${bandsStr}\` This may take a few seconds...`);
		const embed = new EmbedBuilder()
			.setDescription(`\`🔩\` | *Equalizer set to:* \`${bandsStr}\``)
			.setColor(client.color);

		await delay(5000);
        return msg.edit({ content: " ", embeds: [embed] });
	}
};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}