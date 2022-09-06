const { EmbedBuilder } = require('discord.js');

module.exports = { 
    config: {
        name: "pitch",
        description: "Sets the pitch of the song.",
        category: "Filters",
		accessableby: "Member",
		usage: '<pitch>',
	},
	run: async (client, message, args) => {
		const msg = await message.channel.send(`Loading please wait....`);

		const player = client.manager.get(message.guild.id);
		if(!player) return msg.edit(`No playing in this guild!`);
		const { channel } = message.member.voice;
		if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`I'm not in the same voice channel as you!`);

		if (isNaN(args[0])) return msg.edit(`Please enter a number!`);
		if(args[0] > 10 || args[0] < 0) return msg.edit(`Please enter a number between 0 - 10!`);

		const data = {
			op: 'filters',
			guildId: message.guild.id,
			timescale: { pitch: args[0] },
		}

		await player.node.send(data);

		const embed = new EmbedBuilder()
			.setDescription(`\`💠\` | *Pitch set to:* \`${args[0]}\``)
			.setColor(client.color);
		await delay(5000);
		msg.edit({ content: " ", embeds: [embed] });
	}
};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}