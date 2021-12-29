const delay = require('delay');
const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const { reset } = require('../../config/filter');

module.exports = { 
	name: "speed",
	description: "Sets the speed of the song.",
	botPerms: ["SEND_MESSAGES", "EMBED_LINKS", "CONNECT", "SPEAK"],
	options: [
		{
			name: "amount",
			description: "The amount of speed to set the song to.",
			type: 4,
			required: true,
		}
	],
	run: async (interaction, client) => {
		await interaction.deferReply({ ephemeral: false });
		const value = interaction.options.getInteger('amount');

        const player = client.manager.get(interaction.guild.id);
        if(!player) return interaction.editReply("No song/s currently playing in this guild.");
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return interaction.editReply("You need to be in a same/voice channel.")

		if (value < 0) return interaction.editReply('Speed must be greater than 0.');
		if (value > 10) return interaction.editReply('Speed must be less than 10.');

		await player.setFilter('filters', {
			timescale: { speed: value },
		});
		const msg = await interaction.editReply(`Setting **Speed** to **${value}x**. This may take a few seconds...`);
		const embed = new MessageEmbed()
			.setAuthor({ name: `Speed set to: ${value}x`, iconURL: 'https://cdn.discordapp.com/emojis/758423098885275748.gif'})
			.setColor('#000001');
		await delay(5000);
		msg.edit({ content: " ", embeds: [embed] });
			console.log(chalk.magenta(`[SLASHCOMMAND] Speed used by ${interaction.user.tag} from ${interaction.guild.name}`));
	}
};