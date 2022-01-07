const chalk = require('chalk');
const Discord = require('discord.js');
const { PREFIX } = require('../../config.json')
const { reset } = require('../../config/filter')

module.exports = { 
    config: {
        name: "equalizer",
        description: "Sets the equalizer of the current playing song.",
        category: "filters",
        accessableby: "Member",
        usage: "<2 3 0 8 0 5 0 -5 0 0>",
        aliases: ["eq"]
    },

	run: async (client, message, args) => {        
        const player = client.manager.get(message.guild.id);
        if(!player) return message.channel.send("No song/s currently playing in this guild.");
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send("You need to be in a same/voice channel.")

		if (!args[0]) {
			const embed = new Discord.MessageEmbed()
				.setAuthor({ name: 'Custom Equalizer', iconURL: "https://cdn.discordapp.com/emojis/758423098885275748.gif"})
				.setColor('#000001')
				.setDescription('There are 14 bands that can be set from -10 to 10. Not all bands have to be filled out.')
				.addField('Example Equalizer:', `${PREFIX}eq 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n${PREFIX}eq 2 3 0 8 0 5 0 -5 0 0`)
				.addField('Reset Equalizer', `Typing : ${PREFIX}reset`)
			return message.channel.send({ embeds: [embed] });
		}
		else if (args[0] == 'off' || args[0] == 'reset') {
			player.setFilter('filters', reset);
		}

		const bands = args.join(' ').split(/[ ]+/);
		let bandsStr = '';
		for (let i = 0; i < bands.length; i++) {
			if (i > 13) break;
			if (isNaN(bands[i])) return message.channel.send(`Band #${i + 1} is not a valid number. Please type \`${PREFIX}eq\` for info on the equalizer command.`);
			if (bands[i] > 10) return message.channel.send(`Band #${i + 1} must be less than 10. Please type \`${PREFIX}eq\` for info on the equalizer command.`);
		}

		for (let i = 0; i < bands.length; i++) {
			if (i > 13) break;
			player.setFilter('filters', [{ band: i, gain: (bands[i]) / 10 }]);
			bandsStr += `${bands[i]} `;
		}

		const delay = ms => new Promise(res => setTimeout(res, ms));
		const msg = await message.channel.send(`Setting equalizer to... \`${bandsStr}\` Please wait...`);
		const embed = new Discord.MessageEmbed()
			.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true })})
			.setDescription(`Custom Equalizer: \`${bandsStr}\``)
			.setFooter({ text: `Reset Equalizer, Typing: ${PREFIX}reset`})
			.setColor('#000001');

		await delay(5000);
        msg.edit({ content: " ", embeds: [embed] });
            console.log(chalk.magenta(`[COMMAND] Equalizer used by ${message.author.tag} from ${message.guild.name}`));
	}
};