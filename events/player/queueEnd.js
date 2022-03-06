const { MessageEmbed } = require("discord.js");
const GLang = require("../../settings/models/Language.js");

module.exports = async (client, player) => {
	const channel = client.channels.cache.get(player.textChannel);
	if (!channel) return;

	let guildModel = await GLang.findOne({
	  guild: channel.guild.id,
	});
	if (!guildModel) {
	  guildModel = await GLang.create({
		guild: channel.guild.id,
		language: "en",
	  });
	}

	const { language } = guildModel;

	const embed = new MessageEmbed()
		.setColor(client.color)
		.setDescription(`${client.i18n.get(language, "player", "queue_end_desc")}`);

	await channel.send({ embeds: [embed] });
	if (player.twentyFourSeven) return;
	return player.destroy(false);
}