const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../config.json')
const { reset } = require('../../config/filter')

module.exports = { 
	name: 'equalizer',
	description: 'Custom Equalizer!',
	botPerms: ['SEND_MESSAGES', 'EMBED_LINKS', 'CONNECT', 'SPEAK'],
	options: [
		{
			name: 'bands',
			description: 'Number of bands to use (max 14 bands.)',
			type: 3,
		}
	],
	run: async (interaction, client) => {
		await interaction.deferReply({ ephemeral: false });
		const value = interaction.options.getString('bands');

        const player = client.manager.get(interaction.guild.id);
        if(!player) return interaction.editReply("No song/s currently playing in this guild.");
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return interaction.editReply("You need to be in a same/voice channel.")

		if (!value) {
			const embed = new MessageEmbed()
				.setAuthor({ name: 'Custom Equalizer', iconURL: "https://cdn.discordapp.com/emojis/758423098885275748.gif" })
				.setColor('#000001')
				.setDescription('There are 14 bands that can be set from -10 to 10. Not all bands have to be filled out.')
				.addField('Example Equalizer:', `/equalizer 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n/equalizer 2 3 0 8 0 5 0 -5 0 0`)
				.addField('Reset Equalizer', `Typing : /reset`)
			return interaction.editReply({ embeds: [embed] });
		}
		else if (value == 'off' || value == 'reset') {
			player.setFilter('filters', reset);
		}

		const bands = value.split(/[ ]+/);
		let bandsStr = '';
		for (let i = 0; i < bands.length; i++) {
			if (i > 13) break;
			if (isNaN(bands[i])) return interaction.editReply(`Band #${i + 1} is not a valid number. Please type \`/equalizer\` for info on the equalizer command.`);
			if (bands[i] > 10) return interaction.editReply(`Band #${i + 1} must be less than 10. Please type \`/equalizer\` for info on the equalizer command.`);
		}

		for (let i = 0; i < bands.length; i++) {
			if (i > 13) break;
			player.setFilter('filters', [{ band: i, gain: (bands[i]) / 10 }]);
			bandsStr += `${bands[i]} `;
		}

		const delay = ms => new Promise(res => setTimeout(res, ms));
		const msg = await interaction.editReply(`Setting equalizer to... \`${bandsStr}\` Please wait...`);
		const embed = new MessageEmbed()
			.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
			.setDescription(`Custom Equalizer: \`${bandsStr}\``)
			.setFooter({ text: `Reset Equalizer, Typing: /reset`})
			.setColor('#000001');

		await delay(5000);
        msg.edit({ content: " ", embeds: [embed] });
            console.log(chalk.magenta(`[SLASHCOMMAND] Equalizer used by ${interaction.user.tag} from ${interaction.guild.name}`));
	}
};