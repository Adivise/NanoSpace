const delay = require('delay');
const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    name: 'bassboost',
    description: 'Bassboost your music!',
    botPerms: ['SEND_MESSAGES', 'EMBED_LINKS', 'CONNECT', 'SPEAK'],
    options: [
        {
            name: 'amount',
            description: 'The amount of the bassboost',
            type: 4,
        }
    ],
    run: async (interaction, client) => {
        await interaction.deferReply({ ephemeral: false });
        const value = interaction.options.getInteger('amount');
        const player = client.manager.get(interaction.guild.id);
        if(!player) return interaction.editReply("No song/s currently playing in this guild.");
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return interaction.editReply("You need to be in a same/voice channel.")

		if (!value) {
			player.setEQ(Array(6).fill(0).map((n, i) => ({ band: i, gain: 0.65 })));
			const msg1 = await interaction.editReply(`Turning on **Bassboost**. This may take a few seconds...`);
			const embed = new MessageEmbed()
				.setAuthor('Turned on: Bassboost', 'https://cdn.discordapp.com/emojis/758423098885275748.gif')
                .setColor('#000001');
                
			await delay(5000);
            msg1.edit({ content: " ", embeds: [embed] });
            return console.log(chalk.magenta(`[SLASHCOMMAND] BassBoost used by ${interaction.user.tag} from ${interaction.guild.name}`));
        }

		if (isNaN(value)) return interaction.editReply('Amount must be a real number.');

		if (value > 10 || value < -10) {
			player.setEQ(Array(6).fill(0).map((n, i) => ({ band: i, gain: value / 10 })));
		}
		else player.setEQ(Array(6).fill(0).map((n, i) => ({ band: i, gain: value / 10 })));

		const msg2 = await interaction.editReply(`Setting **Bassboost** to **${value}dB**. This may take a few seconds...`);
		const embed = new MessageEmbed()
			.setAuthor(`Bassboost set to: ${value}`, 'https://cdn.discordapp.com/emojis/758423098885275748.gif')
            .setColor('#000001');
            
		await delay(5000);
        msg2.edit({ content: " ", embeds: [embed] });
        return console.log(chalk.magenta(`[SLASHCOMMAND] BassBoost used by ${interaction.user.tag} from ${interaction.guild.name}`));
	}
};