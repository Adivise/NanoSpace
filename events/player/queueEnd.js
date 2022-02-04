const { MessageEmbed } = require("discord.js");

module.exports = async (client, player) => {
	const channel = client.channels.cache.get(player.textChannel);
	const embed = new MessageEmbed()
		.setColor("#000001")
		.setDescription(`\`📛\` | **Song has been:** \`Ended\``)

	await channel.send({ embeds: [embed] });
	if (player.twentyFourSeven) return;
	return player.destroy(false);
}