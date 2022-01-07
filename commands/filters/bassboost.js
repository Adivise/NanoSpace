const delay = require('delay');
const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "bass",
        description: "Turning on bassboost filter",
        category: "filters",
        usage: "<-10 - 10>",
        accessableby: "Member",
        aliases: ["bb"]
    },

    run: async (client, message, args) => {
        const player = client.manager.get(message.guild.id);
        if(!player) return message.channel.send("No song/s currently playing in this guild.");
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send("You need to be in a same/voice channel.")

		if (!args[0]) {
			player.setFilter('filters', Array(6).fill(0).map((n, i) => ({ band: i, gain: 0.65 })));
			const msg1 = await message.channel.send(`Turning on **Bassboost**. This may take a few seconds...`);
			const embed = new MessageEmbed()
				.setAuthor({ name: 'Turned on: Bassboost', iconURL: 'https://cdn.discordapp.com/emojis/758423098885275748.gif'})
                .setColor('#000001');
                
			await delay(5000);
            msg1.edit({ content: " ", embeds: [embed] });
            return console.log(chalk.magenta(`[COMMAND] BassBoost used by ${message.author.tag} from ${message.guild.name}`));
        }

		if (isNaN(args[0])) return message.channel.send('Amount must be a real number.');

		if (args[0] > 10 || args[0] < -10) {
			player.setFilter('filters', Array(6).fill(0).map((n, i) => ({ band: i, gain: args[0] / 10 })));
		}
		else player.setFilter('filters', Array(6).fill(0).map((n, i) => ({ band: i, gain: args[0] / 10 })));

		const msg2 = await message.channel.send(`Setting **Bassboost** to **${args[0]}dB**. This may take a few seconds...`);
		const embed = new MessageEmbed()
			.setAuthor({ name: `Bassboost set to: ${args[0]}`, iconURL: 'https://cdn.discordapp.com/emojis/758423098885275748.gif'})
            .setColor('#000001');
            
		await delay(5000);
        msg2.edit({ content: " ", embeds: [embed] });
        return console.log(chalk.magenta(`[COMMAND] BassBoost used by ${message.author.tag} from ${message.guild.name}`));
	}
};