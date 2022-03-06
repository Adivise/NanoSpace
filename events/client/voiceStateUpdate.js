const { MessageEmbed } = require("discord.js");
const delay = require("delay");
const GLang = require("../../settings/models/Language.js");


module.exports = async (client, oldState, newState) => {
	const player = client.manager?.players.get(newState.guild.id);

	if (!player) return;
	if (!newState.guild.members.cache.get(client.user.id).voice.channelId) player.destroy();

	if (oldState.id === client.user.id) return;
	if (!oldState.guild.members.cache.get(client.user.id).voice.channelId) return;

	if (player.twentyFourSeven) return;
	const leaved = client.channels.cache.get(player.textChannel);

	if (oldState.guild.members.cache.get(client.user.id).voice.channelId === oldState.channelId) {
		if (oldState.guild.me.voice?.channel && oldState.guild.me.voice.channel.members.filter((m) => !m.user.bot).size === 0) {
			const vcRoom = oldState.guild.me.voice.channel.id;

		//	if (!leaved) return;
				let guildModel = await GLang.findOne({
					guild: leaved.guild.id,
				});
				if (!guildModel) {
					guildModel = await GLang.create({
						guild: leaved.guild.id,
						language: "en",
					});
				}
				const { language } = guildModel;

			
		const EmptyEmbed = new MessageEmbed()
			.setColor(client.color)
			.setDescription(client.i18n.get(language, "voicestate", "wait_leave", {
				voice: vcRoom,
				timeout: client.config.LEAVE_TIMEOUT / 60 / 1000,
			  }),
			);

		if (leaved) leaved.send({ embeds: [EmptyEmbed] });
			await delay(client.config.LEAVE_TIMEOUT);

			const vcMembers = oldState.guild.me.voice.channel?.members.size;
			if (!vcMembers || vcMembers === 1) {
			const newPlayer = client.manager?.players.get(newState.guild.id)
			newPlayer ? player.destroy() : oldState.guild.me.voice.channel.leave();

			const TimeoutEmbed = new MessageEmbed(client, newState.guild)
				.setColor(client.color)
				.setDescription(client.i18n.get(language, "voicestate", "timeout_leave", {
					voice: vcRoom,
		  		}),
			);
				if (leaved) leaved.send({ embeds: [TimeoutEmbed] });
			}
		}
	}
};